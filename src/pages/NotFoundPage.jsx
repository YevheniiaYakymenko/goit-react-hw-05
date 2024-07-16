import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>
        Sorry! Page not found! Please go to <Link to="/">Home page</Link>!
      </p>
    </div>
  );
}
