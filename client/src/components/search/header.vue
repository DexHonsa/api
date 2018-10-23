<template>
    <div class="main-container">
      <UserLogin :hide="toggleUserLogin" v-if="userLogin"/>
      <Signup :hide="toggleSignup" v-if="signup" />
      <div v-if="!mobile" class="web-top-bar container ">
          <img @click="$router.push('/')"  src="../../img/logo_small_white.png"/>
          
          <div class="top-nav" :class="{'mobile':mobile, 'collapsed':!navOpen}">
            <ul>
              <span>Menu</span>
              <li @click="$router.push('/search')"><i class="fa fa-search"></i>Explore</li>
              <li @click="toggleDropdown('executives')">Executives <i class="fa fa-angle-down"></i>

                <transition
                  enter-active-class="zoomIn2"
                  leave-active-class="fadeOutDown"
                >
                <div v-if="dropdown == 'executives'" class="basic-dropdown animated-fast">
                  <li>Studio Executives</li>
                  <li>Network Executives</li>
                </div>
                </transition>
              </li>
              <li @click="toggleDropdown('deals')">Deals <i class="fa fa-angle-down"></i>
                 <transition
                  enter-active-class="zoomIn2"
                  leave-active-class="fadeOutDown"
                >
                <div v-if="dropdown == 'deals'" class="basic-dropdown animated-fast">
                  <li>Studio Deals</li>
                  <li>Network Deals</li>
                </div>
              </transition>
              </li>
              <li>Independent Film Producers</li>
              <li v-if="isLoggedIn" @click="logout">Logout</li>
              <li v-if="isLoggedIn" class="get-started"><i class="fa fa-user-circle"></i>&nbsp;{{user.username}}</li>
              <li v-if="!isLoggedIn" @click="toggleUserLogin">User Login</li>
              <li v-if="!isLoggedIn" class="get-started" @click="signup = !signup">Sign Up</li>
              
            </ul>
          </div>
          
      </div>
      <div v-if="mobile" :class="{'scrolled animated-med fadeInDown': headerScroll}" class="web-top-bar container ">
          <img src="../../img/logo_small_white.png"/>
          <i  @click="toggleMobileNav" class="fa fa-bars nav-toggle"></i>
          <div class="top-nav" :class="{'mobile':mobile, 'collapsed':!navOpen}">
            <ul>
              <span>Menu</span>
              <li @click="$router.push('/search')"><i class="fa fa-search"></i>Explore</li>
              <li>Executives</li>
              <li>Studio Executives</li>
              <li>Network Deals</li>
              <li>Studio Deals</li>
              <li>Independent Film Producers</li>
              <li v-if="isLoggedIn" @click="logout">Logout</li>
              <li v-if="isLoggedIn" class="get-started"><i class="fa fa-user-circle"></i>&nbsp;{{user.username}}</li>
              <li v-if="!isLoggedIn" @click="toggleUserLogin">User Login</li>
              <li v-if="!isLoggedIn" class="get-started" @click="signup = !signup">Sign Up</li>
              
            </ul>
          </div>
          
      </div>

      
      
    </div>
</template>
<script>
import auth from "../../auth";
import UserLogin from "../login/login_form";
import Signup from "../login/signup";
export default {
  name: "search_header",
  components: {
    UserLogin,
    Signup
  },
  data() {
    return {
      navOpen: false,
      userLogin: false,
      signup: false,
      mobile: false,
      dropdown: ""
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      if (dropdown == "") {
        if (this.dropdown != "") {
          this.dropdown = "";
          return;
        }
        return;
      }
      if (this.dropdown != "" && this.dropdown == dropdown) {
        this.dropdown = "";
        return;
      }
      if (this.dropdown == dropdown) {
        this.dropdown = "";
      }

      this.dropdown = dropdown;
    },
    toggleUserLogin() {
      this.userLogin = !this.userLogin;
    },
    toggleSignup() {
      this.signup = !this.signup;
    },
    logout() {
      auth.logout();
    },
    toggleMobileNav() {
      this.navOpen = !this.navOpen;
    }
  },
  mounted() {
    if (this.$mq == "sm") {
      this.mobile = true;
    }
  },
  watch: {
    $mq(val) {
      if (val == "sm") {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.userStore.user;
    },
    isLoggedIn() {
      if (this.$store.state.userStore.user.id != null) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
