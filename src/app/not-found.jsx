import React from "react";
import Link from "next/link";
const NotFound = () => {
  return (
    <div>
      <h1 className="text-4xl text-red-600">PAGE NOT FOUND</h1>

      <Link href="/">Return To Home</Link>
    </div>
  );
};

export default NotFound;
