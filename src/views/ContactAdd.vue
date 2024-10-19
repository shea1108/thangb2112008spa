<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';

// Reactive state to manage messages
const message = ref('');
const router = useRouter();

// Function to handle adding a new contact
async function onAddContact(contact) {
  try {
    await contactsService.createContact(contact);
    message.value = 'Liên hệ mới đã được tạo thành công.';
    router.push({ name: 'contactbook' }); // Redirect to contact book after success
  } catch (error) {
    console.log(error);
    message.value = 'Đã xảy ra lỗi khi tạo liên hệ.';
  }
}
</script>

<template>
  <div class="page">
    <h4>Thêm Liên hệ Mới</h4>
    <ContactForm @submit:contact="onAddContact" />
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
