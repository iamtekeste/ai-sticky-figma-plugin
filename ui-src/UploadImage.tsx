import { useMutation } from "@tanstack/react-query";
import { FileUpload } from "@ark-ui/react";
import { Button, Flex, Spinner } from "@radix-ui/themes";

const UploadImage = () => {
  const { mutateAsync: processImage, status } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        "https://62nwxl4qe4h7czpxmh7kehf5qu0kkyva.lambda-url.us-east-1.on.aws/analyze",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Upload failed");
      const stickies = await res.json();
      return stickies;
    },
    onSuccess: (stickies) => {
      parent.postMessage(
        { pluginMessage: { type: "create-stickies", stickies } },
        "*"
      );
    },
  });

  const handleFileChange = (files: File[]) => {
    if (files.length < 1) return;
    processImage(files[0]);
  };

  const isLoading = status === "pending";

  return (
    <FileUpload.Root
      maxFiles={1}
      onFileAccept={(details) => {
        handleFileChange(details.files);
      }}
    >
      {isLoading && (
        <Flex direction={`column`} justify={`center`} align={`center`}>
          <Spinner />
          <p>Analyzing image...</p>
        </Flex>
      )}
      {status === "success" && <h3>Sticky notes imported!</h3>}
      {status === "idle" && (
        <FileUpload.Dropzone>
          <Flex
            direction={`column`}
            justify={`center`}
            align={`center`}
            gap={`4`}
          >
            Drop your image here
            <FileUpload.Trigger asChild>
              <Button>Or select image</Button>
            </FileUpload.Trigger>
          </Flex>
        </FileUpload.Dropzone>
      )}
    </FileUpload.Root>
  );
};

export default UploadImage;
