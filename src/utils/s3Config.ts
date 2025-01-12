import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('print_files')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('print_files')
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath
  };
};