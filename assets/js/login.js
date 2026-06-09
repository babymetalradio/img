const togglePassword =
document.getElementById(
"togglePassword"
);

const password =
document.getElementById(
"password"
);

togglePassword?.addEventListener(
"click",
() => {

password.type =
password.type === "password"
? "text"
: "password";

}
);