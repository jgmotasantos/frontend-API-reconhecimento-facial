<template>
  <div>
    <app-navbar></app-navbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <h1>Criar Membro</h1>
        <div class="input-container">
          <input 
            class="group-input" 
            placeholder="Adicionar novo membro..." 
            v-model="name" 
            @keyup.enter="handleSubmit" 
            :disabled="loading"
          >
          <button 
            class="add-button" 
            @click="handleSubmit" 
            :disabled="loading"
          >
            <i class="fa fa-plus-circle"></i>
          </button>
        </div>
        <div v-if="loading" class="loading-message">
          Adicionando membro...
        </div>
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div>
          <video ref="video" class="video-box" width="320" height="240" autoplay></video>
          <button type="button" class="photo-button" @click="capturePhoto">Tirar Foto</button>
        </div>
        <canvas ref="canvas" width="320" height="240" style="display: none;"></canvas>
        <div v-if="photoData">
          <img :src="'data:image/jpeg;base64,' + photoData" alt="Captura da webcam" />
          <button class="save-button" @click="handleSubmit">Salvar Foto</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNavbar from './AppNavbar.vue';

export default {
  name: 'CreateMember',
  components: {
    AppNavbar,
  },
  data() {
    return {
      name: '',
      loading: false,
      successMessage: '',
      errorMessage: '',
      photoData: null,
    };
  },
  mounted() {
    this.setupWebcam();
  },
  methods: {
    setupWebcam() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((err) => {
          console.error("Erro ao acessar a webcam: ", err);
        });
    },
    capturePhoto() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      context.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/jpeg');
      
      // Retirando prefixo
      this.photoData = imageDataURL.replace(/^data:image\/(jpeg);base64,/, '');
    },
    async handleSubmit() {
      const nomeDoGrupo = this.$route.params.nomeDoGrupo;

      if (!this.name) {
        alert('Por favor, preencha o nome.');
        return;
      }

      if (!this.photoData) {
        alert('Por favor, tire uma foto.');
        return;
      }

      const payload = {
        name: this.name,
        face: this.photoData,
      };

      console.log('Dados a serem enviados:', payload);

      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      try {
        const response = await axios.post(
          `/grupos/${nomeDoGrupo}/detalhes/adicionar`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true 
          }
        );
        this.successMessage = 'Membro adicionado com sucesso!';
        this.name = '';
        this.photoData = null;
        console.log('Sucesso:', response.data);
      } catch (error) {
        this.errorMessage = 'Erro ao adicionar membro.';
        console.error('Erro:', error.response ? error.response.data : error.message);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped>
@import '../styles/MyGroups.css';

.video-box {
  display: block;
  margin: 10px auto;
}

.photo-button, .save-button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.photo-button:hover, .save-button:hover {
  background-color: #45a049;
}

button {
  margin: 5px;
}

img {
  display: block;
  margin: 10px auto;
  width: 320px;
  height: 240px;
}
</style>
