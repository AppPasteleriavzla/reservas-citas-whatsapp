// Objeto para almacenar los datos del formulario
const formData = {
    nombre: '',
    servicio: '',
    dia: '',
    horario: ''
};

// Función para navegar entre secciones
function goToSection(nextSectionId, currentInputId = null) {
    // 1. (Opcional) Validar el campo actual si se proporcionó un ID
    if (currentInputId) {
        const inputElement = document.getElementById(currentInputId);
        if (inputElement && !inputElement.value) {
             alert(`Por favor, completa el campo: ${inputElement.labels[0]?.innerText || currentInputId}`);
             inputElement.focus();
             return; // Detener si la validación falla
        }
         // Guardar el dato en el objeto formData
        formData[currentInputId] = inputElement.value;
    }

    // 2. Ocultar todas las secciones
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 3. Mostrar la sección deseada
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
        nextSection.classList.add('active');

        // Si es la sección de confirmar, llenar el resumen
        if (nextSectionId === 'section-confirmar') {
            fillSummary();
        }
    } else {
        console.error("Error: No se encontró la sección con ID:", nextSectionId);
    }

    // Asegura que la vista suba al inicio de la nueva sección (útil en móvil)
    window.scrollTo(0, 0); 
}

// Función para llenar el resumen antes de enviar
function fillSummary() {
    const summaryList = document.getElementById('summary');
    summaryList.innerHTML = `
        <li><strong>Nombre:</strong> ${formData.nombre}</li>
        <li><strong>Servicio:</strong> ${formData.servicio}</li>
        <li><strong>Día:</strong> ${formData.dia}</li>
        <li><strong>Horario:</strong> ${formData.horario}</li>
    `;
}

// Función para generar y abrir el enlace de WhatsApp
function generateWhatsAppLink() {
    // Revisa si todos los datos están (doble chequeo)
    if (!formData.nombre || !formData.servicio || !formData.dia || !formData.horario) {
         alert("Parece que faltan datos. Por favor, retrocede y completa todos los pasos.");
         return; // No generar enlace si falta algo
    }

    const telefonoBarbero = "58XXXXXXXXXX"; // IMPORTANTE: Reemplaza con el número de WhatsApp del barbero (Código de país + número, sin +, sin espacios)

    // Construir el mensaje
    let mensaje = `Hola, quiero agendar una cita:\n`;
    mensaje += `*Nombre:* ${formData.nombre}\n`;
    mensaje += `*Servicio:* ${formData.servicio}\n`;
    mensaje += `*Día:* ${formData.dia}\n`; // Asegúrate que el formato de fecha sea legible
    mensaje += `*Horario:* ${formData.horario}`;

    // Codificar el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Construir el enlace final
    const whatsappUrl = `https://wa.me/<span class="math-inline">\{telefonoBarbero\}?text\=</span>{mensajeCodificado}`;

    // Asignar al botón (aunque ya lo abre al hacer clic) y opcionalmente abrirlo
    const linkElement = document.getElementById('whatsapp-link');
    linkElement.href = whatsappUrl;

    // Opcional: Abrir directamente si prefieres que no solo se asigne el href
    // window.open(whatsappUrl, '_blank'); 
}

// Asegurar que la primera sección esté visible al cargar
document.addEventListener('DOMContentLoaded', () => {
    const firstSection = document.querySelector('.form-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});