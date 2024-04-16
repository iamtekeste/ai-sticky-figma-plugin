import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button, Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import UploadImage from "./UploadImage";
import "./style.css";
function Plugin() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Flex
          align={`center`}
          justify={`center`}
          style={{
            border: `1px dashed #ddd`,
            padding: `20px`,
            borderRadius: `4px`,
            height: `calc(100vh - 40px)`,
          }}
        >
          <UploadImage />
        </Flex>
      </Theme>
    </QueryClientProvider>
  );
}

ReactDOM.render(<Plugin />, document.getElementById("root"));
