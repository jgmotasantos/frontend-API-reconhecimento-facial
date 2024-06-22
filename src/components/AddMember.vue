<template>
  <div>
    <AddmNavbar></AddmNavbar>
    <div class="my-groups-wrapper">
      <div class="container">
        <h1>Criar Membro</h1>
        <div class="input-container">
          <input 
            class="group-input" 
            placeholder="Adicionar novo membro..." 
            v-model="name" 
            :disabled="loading"
          >
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
        <div class="video-container">
          <video ref="video" class="video-box" width="320" height="240" autoplay></video>
        </div>
        <div class="button-container">
          <button type="button" class="photo-button" @click="capturePhoto">Tirar Foto</button>
        </div>

        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <img :src="'data:image/jpeg;base64,' + photoData" alt="Captura da webcam" class="captured-photo"/>
            <div class="modal-buttons">
              <button class="save-button" @click="handleSubmit">Salvar Foto</button>
              <button class="retake-button" @click="retakePhoto">Tirar Foto Novamente</button>
            </div>
          </div>
        </div>

        <canvas ref="canvas" width="320" height="240" style="display: none;"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AddmNavbar from './AddMemberNavbar.vue';

export default {
  name: 'CreateMember',
  components: {
    AddmNavbar,
  },
  data() {
    return {
      name: '',
      loading: false,
      successMessage: '',
      errorMessage: '',
      photoData: null,
      showModal: false,
      stream: null,
    };
  },
  mounted() {
    this.setupWebcam();
  },
  beforeUnmount() {
    this.stopWebcam();
  },
  methods: {
    setupWebcam() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.stream = stream;
          this.$refs.video.srcObject = stream;
        })
        .catch((err) => {
          console.error("Erro ao acessar a webcam: ", err);
        });
    },
    stopWebcam() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
    },
    capturePhoto() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      context.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/jpeg');
      
      // Armazenar a foto como base64
      this.photoData = imageDataURL.replace(/^data:image\/jpeg;base64,/, '');
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    retakePhoto() {
      this.photoData = null;
      this.showModal = false;
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
        this.showModal = false;
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
@import '../styles/AddMember.css';

.video-box {
  display: block;
  margin: 10px auto;
}

.photo-button, .save-button, .retake-button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 150px; /* Tamanho fixo para ambos os botões */
  text-align: center; /* Alinhamento do texto ao centro */
}

.photo-button:hover, .save-button:hover, .retake-button:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.loading-message, .success-message, .error-message {
  text-align: center;
  margin-top: 20px;
  color: #ffcc00;
}

.error-message {
  color: #ff4d4d;
}

.success-message {
  color: #4CAF50;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #1c1c1c;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 60%;
  max-width: 800px;
}

.modal-content h3 {
  color: #fff; /* Cor branca para o texto */
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.validate-button, .retake-button, .save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.validate-button:hover, .retake-button:hover, .save-button:hover {
  background-color: #0056b3;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.captured-photo {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

img {
  display: block;
  margin: 10px auto;
  width: 320px;
  height: 240px;
}
</style>
