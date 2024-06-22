<template>
  <div>
    <FaceValidationNavbar :groupName="groupName"></FaceValidationNavbar>
    <div class="face-validation-wrapper">
      <div class="container">
        <h1>Validar Face - {{ sessionName }}</h1>
        <h2>Enviar uma foto para validação</h2>
        <div class="video-container">
          <video ref="video" class="video-box" width="320" height="240" autoplay></video>
        </div>
        <div class="button-container">
          <button type="button" class="photo-button" @click="capturePhoto">Tirar Foto</button>
          <button type="button" class="end-session-button" @click="confirmEndSession">Encerrar esta sessão</button>
        </div>
        
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <img :src="'data:image/jpeg;base64,' + photoData" alt="Captura da webcam" class="captured-photo"/>
            <div class="modal-buttons">
              <button class="validate-button" @click="validatePhoto">Validar Foto</button>
              <button class="retake-button" @click="retakePhoto">Tirar Foto Novamente</button>
            </div>
          </div>
        </div>

        <div v-if="showEndSessionModal" class="modal">
          <div class="modal-content">
            <h3>Deseja mesmo encerrar esta sessão?</h3>
            <button @click="endSession" class="confirm-btn">Sim</button>
            <button @click="cancelEndSession" class="cancel-btn">Não</button>
          </div>
        </div>

        <canvas ref="canvas" width="320" height="240" style="display: none;"></canvas>
        <div v-if="loading" class="loading-message">Validando foto...</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FaceValidationNavbar from './FaceValidationNavbar.vue';

export default {
  name: 'FaceValidation',
  components: {
    FaceValidationNavbar,
  },
  data() {
    return {
      loading: false,
      successMessage: '',
      errorMessage: '',
      photoData: null,
      showModal: false,
      showEndSessionModal: false,
      groupName: this.$route.params.nomeDoGrupo,
      sessionName: this.$route.params.nomeDaSessao,
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
    async validatePhoto() {
      if (!this.photoData) {
        alert('Por favor, tire uma foto.');
        return;
      }

      const payload = {
        face: this.photoData,
      };

      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      try {
        const response = await axios.patch(
          `http://localhost:8080/grupos/${this.groupName}/sessoes/${this.sessionName}/validar-face`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true 
          }
        );
        console.log(response.data);  // Log de sucesso
        this.successMessage = 'Foto validada com sucesso!';
        this.photoData = null;
        this.showModal = false;
      } catch (error) {
        this.errorMessage = 'Erro ao validar foto.';
        console.error('Erro:', error.response ? error.response.data : error.message);
      } finally {
        this.loading = false;
      }
    },
    confirmEndSession() {
      this.showEndSessionModal = true;
    },
    cancelEndSession() {
      this.showEndSessionModal = false;
    },
    async endSession() {
      try {
        const response = await axios.post(`http://localhost:8080/grupos/${this.groupName}/sessoes/${this.sessionName}/encerrar`, {}, {
          withCredentials: true
        });
        console.log(response.data);  // Log de sucesso
        this.successMessage = 'Sessão encerrada com sucesso!';
        this.showEndSessionModal = false;
      } catch (error) {
        this.errorMessage = 'Erro ao encerrar a sessão.';
        console.error('Erro ao encerrar a sessão:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>
@import '../styles/FaceValidation.css';

.face-validation-wrapper {
  background: url("../assets/sessionsbg.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  width: 700px;
  height: 550px;
  min-height: 400px;
  padding: 30px;
  background-color: #1c1c1c;
  border: 2px solid rgb(0, 98, 255);
  border-radius: 10px;
  backdrop-filter: blur(15px);
  text-align: center;
}

h1 {
  color: #eee;
  text-align: center;
  margin-bottom: 20px;
}

p {
  color: #fff;
  margin-bottom: 20px;
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.photo-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.photo-button:hover {
  background-color: #0056b3;
}

.end-session-button {
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.end-session-button:hover {
  background-color: #cc0000;
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

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.validate-button, .retake-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.validate-button:hover, .retake-button:hover {
  background-color: #0056b3;
}

.confirm-btn, .cancel-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 3px;
  margin: 10px;
}

.confirm-btn:hover {
  background-color: #000;
}

.cancel-btn:hover {
  background-color: #000;
}

.confirm-btn {
  background-color: #ff4d4d;
}

.cancel-btn {
  background-color: #0056b3;
}
</style>
