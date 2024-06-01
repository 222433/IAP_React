import { FC, useRef, useState, useEffect } from "react"
import { Base64 } from 'js-base64';
import { makeRequest } from "./makeRequest";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getEmail } from "./userService";
export function Login() {
  const oauthUrl = "https://localhost/oauth2/authorization/google"
  const formauthUrl = "https://localhost/login"
  return (
    <div>
      <a href={oauthUrl}>Login with google</a>
      <br />
      <a href={formauthUrl}>Login with password</a>
    </div>
  );
}
