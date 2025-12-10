import { RouterProvider } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import router from "./router";

function App() {
  return (
    <>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </>
  );
}

export default App;
