# 🐾 Sistema de Gestión para Clínica Veterinaria

Aplicación web desarrollada en **Angular + TypeScript + Bootstrap** para el Examen Parcial del curso **Desarrollo de Interfaces 3**.

## Integrantes
- Sebastián alejandro oropeza caraballo
- Samuel jared peña
- Brais carreño
- Juan leonidas cajan
- Lelis dexar bellasmin

# Funcionalidades Principales
1. **Registro de Mascotas y Dueños (`/mascotas`)**: Formulario reactivo con validaciones, persistencia en `localStorage` y tarjetas reutilizables con comunicación padre-hijo (`@Input` y `@Output`).
2. **Agenda de Citas (`/citas`)**: Programación de citas ordenadas por fecha, uso de **Pipe personalizado** (`estadoCita`) y **Directiva personalizada** (`appResaltarCita`) que resalta automáticamente las citas del día actual.
3. **Historial Médico (`/historial`)**: Consulta de atenciones filtradas por mascota y registro de diagnósticos/notas médicas.

## Arquitectura del Proyecto
- `src/app/models/`: Interfaces (`IMascota`, `Cita`) y clases con herencia POO (`EntidadBase`, `Mascota`).
- `src/app/services/`: `VeterinariaService` para centralizar el estado y guardar datos en `localStorage`.
- `src/app/shared/`: Pipe personalizado (`estado-cita`) y Directiva personalizada (`resaltar-cita`).
- `src/app/features/`: Componentes modulares por vista (`mascotas`, `citas`, `historial`).

## Instalación y Ejecución
1. Clonar el repositorio:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd clinica-veterinaria

   instalar dependencias: npm install
   
   ejecutar: ng serve -o

## Pruebas Manuales Realizadas
 registro de nueva mascota con validación de campos obligatorios y teléfono de 9 dígitos

 agendamiento de cita con fecha actual verificando el resaltado amarillo automático

 cambio de estado de cita de "pendiente" a "atendida" y guardado de diagnóstico persistente al recargar la página