<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import firebaseui from "firebaseui";

export default {
  name: "Auth",
  mounted() {
    const uiConfig = {
      signInSuccessUrl: "#",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
