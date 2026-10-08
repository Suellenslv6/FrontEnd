"use client";

import Parse from "parse";

Parse.initialize(
  process.env.NEXT_PUBLIC_B4A_APP_ID,
  process.env.NEXT_PUBLIC_B4A_JS_KEY
);
Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;