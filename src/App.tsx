import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { authProvider, dataProvider, liveProvider } from "./providers";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ForgotPassword, Home, Login, Register } from "./pages";
import Layout from "./components/layout";
import { resources } from "./config/resource";
import CompanyList from "./pages/companies/list";
import CreateCompany from "./pages/companies/create";
import EditCompany from "./pages/companies/edit";
import TaskList from "./pages/tasks/list";
import TasksCreatePage from "./pages/tasks/create";
import TasksEditPage from "./pages/tasks/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                resources={resources}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "q04QFo-RVjDfC-W4sh1I",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                
                  <Route
                    element={
                      <Authenticated
                        key='authenticated-layout'
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<CreateCompany />}/>
                      <Route path="edit/:id" element={<EditCompany />}/>
                    </Route>
                    <Route path='/tasks' element={<TaskList>
                      <Outlet />
                    </TaskList>} >
                      <Route path="new" element={<TasksCreatePage />} />
                      <Route path="edit/:id" element={<TasksEditPage />} />
                    </Route>
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
