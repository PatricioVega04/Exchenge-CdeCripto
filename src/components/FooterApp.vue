<template>
    <footer class="footer">
    <div class="social-icons">
      <a href="https://www.instagram.com/cdecripto.ath?igsh=eW90ZHUydTg1cTM5" class="social-icon">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://x.com/CdeCriptoz?t=0DCuO8so_xEtUNZrGvrOXg&s=09" class="social-icon">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://t.me/ComunidadCdeCripto" class="social-icon">
        <i class="fab fa-telegram"></i>
      </a>
      <a href="https://youtube.com/@cdecripto?si=dHPJ8dPALojviOrA" class="social-icon">
        <i class="fab fa-youtube"></i>
      </a>
    </div>
    <p>Casi todos los derechos reservados...</p>
     <p>@Patriciovega037@gmail.com</p>
    </footer>
</template>
<script setup>

import '@fortawesome/fontawesome-free/css/all.css';
</script>
<style scoped>
footer {
  text-align: center;
  background-color: black;
  padding: 2rem 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.social-icon {
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #c8a2c8; 
}

p {
  color: white;
  margin: 0;
}
</style>
