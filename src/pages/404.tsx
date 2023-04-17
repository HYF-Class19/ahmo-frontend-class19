import MainLayout from "@/layouts/MainLayout";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Link from "next/link";

const Custom404 = () => {
  return (
    <MainLayout
      title={"AHMO - not found"}
      description="AHMO chat. Page in not found"
    >
      <div className="errorWrapper">
        <div className="errorMessage">
          <WarningAmberIcon
            color="warning"
            sx={{ width: 180, height: 180, mr: 6 }}
          />
          <div>
            <h1>Page not found</h1>
            <p>The page you requested does not exist.</p>

            <Link href="/">Return to home page</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Custom404;
