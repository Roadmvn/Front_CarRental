import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import CreateListing from "../views/CreateListing.vue";
import EditListing from "../views/EditListing.vue";
import Profile from "../views/Profile.vue";
import PublicProfile from "../views/PublicProfile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import VehicleDetails from "../views/VehicleDetails.vue";
import TransactionPage from "../views/TransactionPage.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import TermsOfService from "../views/TermsOfService.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/search", name: "Search", component: Search },
    {
      path: "/create-listing",
      name: "CreateListing",
      component: CreateListing,
    },
    { path: "/edit-listing/:id", name: "EditListing", component: EditListing },
    { path: "/profile", name: "Profile", component: Profile },
    { path: "/user/:id", name: "PublicProfile", component: PublicProfile },
    { path: "/login", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    { path: "/vehicle/:id", name: "VehicleDetails", component: VehicleDetails },
    {
      path: "/transaction/:id",
      name: "Transaction",
      component: TransactionPage,
    },
    { path: "/about", name: "About", component: About },
    { path: "/contact", name: "Contact", component: Contact },
    {
      path: "/terms-of-service",
      name: "TermsOfService",
      component: TermsOfService,
    },
    {
      path: "/privacy-policy",
      name: "PrivacyPolicy",
      component: PrivacyPolicy,
    },
  ],
});

export default router;
