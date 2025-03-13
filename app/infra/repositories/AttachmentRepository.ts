import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { supabase } from "@infra/databases/supabase";
import { Attachment } from "app/domain/models/Attachment";

type File = { 
  uri: string;
  type: string;
  size: number;
}

export function useAttachmentRepository() {
  function generateUniqueName(uri: string) {
    const identifier = String(Date.now() + Math.floor(Math.random() * 1E10));
    return String(identifier + "-" + uri.split("/").pop());
  }

  async function getMainBucket() {
    const bucket = await supabase.storage.getBucket("files");

    if(!!bucket.error) {
      throw new Error(bucket.error.message);
    }

    return bucket.data;
  }

  async function upload(file: File) {
    const bucket = await getMainBucket();

    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const user = await supabase.auth.getUser();

    if(!!user.error) {
      throw new Error(user.error.message);
    }

    const fileUniqueName = generateUniqueName(file.uri);
    const filePath = `${user.data.user.id}/${fileUniqueName}`;

    const upload = await supabase.storage
      .from(bucket.name)
      .upload(filePath, decode(base64), {
        upsert: false,
        contentType: file.type,
      });

    if(!!upload.error) {
      throw new Error(upload.error.message);
    }

    const url = supabase.storage
      .from(bucket.name)
      .getPublicUrl(upload.data?.path!);

    const filename = file.uri.split("/").pop()!;

    const attachment = await supabase
      .from("attachments")
      .insert({
        name: filename,
        size: file.size,
        mimetype: file.type,
        url: url.data.publicUrl,
      })
      .select<"*", Attachment>()
      .single();

    if(!!attachment.error) {
      throw new Error(attachment.error.message);
    }

    return attachment.data;
  }

  return {
    upload,
  }
}