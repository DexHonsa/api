<template>
    <div>
        <Header />
        <div class="container">
            <div v-if="isLoading" class="double-loader"><img src="../../img/double_loader.svg" alt=""></div>
            <div v-if="!isLoading" class="search-panel animated-med fadeInUp">
            <div class="result-panel-top">
                <div class="result-panel-image"><img :src="require('../../listingImgs/'+result.image)" alt=""></div>
                <div class="result-panel-title-box">
                    <div class="result-panel-title">{{result.name}}</div>
                    
                        <div class="row">
                            <div class=" result-panel-types col-sm-12 col-md-6">
                            <div v-for="(typ, index) in result.type" :key="index" :class="typ" class="result-panel-type">{{typ}}</div>
                            </div>
                            <div class="result-panel-star-box col-sm-12 col-md-6">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                    
                    <hr style="border-color:#eaeaea; border-width:2px;">
                </div>
                
            </div>
            <div class="result-content">
                <div class="row">
                <div v-if="result.deal != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Deal</div>
                        <div class="result-content-item-value">{{result.deal}}</div>
                    </div>
                </div>
                <div v-if="result.rep_name != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Representation</div>
                        <div class="result-content-item-value">{{result.rep_name}}</div>
                    </div>
                </div>
                <div v-if="result.rep_email != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Representation Email</div>
                        <div class="result-content-item-value">{{result.rep_email}}</div>
                    </div>
                </div>
                <div v-if="result.rep_phone != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Representation Phone</div>
                        <div class="result-content-item-value">{{result.rep_phone}}</div>
                    </div>
                </div>
                <div v-if="result.company != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Company</div>
                        <div class="result-content-item-value">{{result.company}}</div>
                    </div>
                </div>
                <div v-if="result.studio_executive != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Executive</div>
                        <div class="result-content-item-value">Studio Executive at {{result.studio_executive}}</div>
                    </div>
                </div>
                <div v-if="result.network_executive != null" class="col-sm-6">
                    <div class="result-content-item">
                        <div class="result-content-item-title">Executive</div>
                        <div class="result-content-item-value">Network Executive at {{result.network_executive}}</div>
                    </div>
                </div>
                
                </div>
                <div class="row ">
                  
                <div v-if="result.film_credits != null" class="col-sm-6">
                    <div class="credits-item film">
                      <div class="credits-icon"><img src="../../img/film_icon.png" alt=""></div>
                      <div>
                        <div class="credits-item-title">Film Credits</div>
                        <div class="credits-item-value">{{result.film_credits.join(', ')}}</div>
                      </div>
                    </div>
                </div>
                <div v-if="result.tv_credits != null" class="col-sm-6">
                    <div class="credits-item tv">
                      <div class="credits-icon"><img src="../../img/tv_icon.png" alt=""></div>
                      <div>
                        <div class="credits-item-title">TV Credits</div>
                        <div class="credits-item-value">{{result.tv_credits.join(', ')}}</div>
                      </div>
                    </div>
                </div>
                
                </div>
                
            </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import Header from "./header";
import { mapActions } from "vuex";
export default {
  name: "result",
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getProfessional(this.$route.params.id).then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    ...mapActions(["getProfessional"])
  },
  computed: {
    result() {
      return this.$store.state.professionalStore.activeProfessional;
    }
  },
  components: {
    Header
  }
};
</script>
<style>
.double-loader {
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.double-loader img {
  width: 50px;
}
.result-panel-top {
  display: flex;
  align-items: center;
}
.result-panel-title-box {
  width: 100%;
  margin-left: 15px;
}
.result-panel-title {
  color: #000;
  font-size: 26pt;
  font-weight: bold;
}
.result-panel-image {
  transform: translateY(-50px);
}
.result-panel-image img {
  height: 250px;
  width: 250px;
  border-radius: 250px;
  border: solid 5px #fff;
  box-shadow: 0px 22px 30px -8px rgba(0, 0, 0, 0.6);
}
.result-panel-types {
  display: flex;
  align-items: center;
}
.result-content {
  padding: 25px;
  color: #000;
}
.result-panel-type {
  width: 100px;
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 40px;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
}
.result-panel-star-box {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.result-panel-star-box i {
  font-size: 25pt;
  margin-left: 10px;
  color: #cae7f2;
}
.result-content-item {
  display: flex;
  align-items: center;
  padding: 10px 0px;
}

.result-content-item-title {
  font-size: 12pt;
  font-weight: bold;
}
.result-content-item-value {
  font-size: 12pt;
  font-weight: bold;
  margin-left: auto;
}
.credits-item {
  border-radius: 5px;
  border: solid 2px #5d9bb2;
  padding: 15px;
  display: flex;
  margin-top: 10px;
  align-items: center;
}
.credits-item.tv {
  border-color: #a6e45e;
}
.credits-item.tv .credits-icon {
  color: #a6e45e;
}
.credits-icon {
  color: #5d9bb2;
  margin-right: 15px;
}
.credits-icon img {
  width: 50px;
}
.credits-item-title {
  font-weight: bold;
  font-size: 12pt;
}
.credits-item-value {
  font-weight: bold;
  font-size: 10pt;
}
@media (max-width: 720px) {
  .result-content-item-title {
    font-size: 10pt;
  }
  .result-content-item-value {
    font-size: 10pt;
  }
  .credits-item-title {
    font-size: 11pt;
  }
  .credits-item-value {
    font-size: 9pt;
  }
  .result-content {
    padding: 5px;
    color: #000;
  }
  .result-panel-title {
    font-size: 16pt;
  }
  .result-panel-image {
    transform: translateY(-30px);
  }
  .result-panel-image img {
    height: 110px;
    width: 110px;
    border-radius: 70px;
    border: solid 3px #fff;
    box-shadow: 0px 14px 20px -8px rgba(0, 0, 0, 0.6);
  }
  .result-panel-type {
    width: 55px;
    height: 18px;
    font-size: 8pt;
    display: flex;
    align-items: center;
    border-radius: 40px;
    justify-content: center;
    margin-right: 3px;
    font-weight: bold;
  }
  .result-panel-star-box i {
    font-size: 15pt;
    margin-top: 10px;
    margin-left: unset;
    margin-right: 10px;
    color: #cae7f2;
  }
}
</style>
