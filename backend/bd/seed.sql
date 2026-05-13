INSERT INTO categories (name, color)
VALUES
('Bug', '#ef4444'),
('Feature', '#3b82f6'),
('Improvement', '#22c55e');

INSERT INTO tasks (title, description, status, category_id)
VALUES
(
    'Crear pagina de inicio',
    'Diseño e implementación de UI',
    'pending',
    2
),
(
    'Corregir bug navbar',
    'Navbar se sobrepone en móviles',
    'in_progress',
    1
),
(
    'Mejorar estilos dashboard',
    'Agregar responsive design',
    'completed',
    3
),
(
    'Diseñar dashboard principal',
    'Crear interfaz moderna para el panel principal',
    'pending',
    2
),
(
    'Corregir error en login',
    'El formulario no valida correctamente las credenciales',
    'in_progress',
    1
),
(
    'Optimizar consultas SQL',
    'Reducir tiempos de respuesta en el listado de tareas',
    'completed',
    3
),
(
    'Implementar paginación',
    'Mostrar máximo 10 tareas por página',
    'pending',
    2
),
(
    'Agregar filtros de búsqueda',
    'Permitir filtrar tareas por estado',
    'in_progress',
    2
),
(
    'Mejorar diseño responsive',
    'Ajustar componentes para dispositivos móviles',
    'completed',
    3
),
(
    'Corregir estilos del navbar',
    'El navbar se desordena en pantallas pequeñas',
    'pending',
    1
),
(
    'Crear endpoint de categorías',
    'Permitir obtener categorías desde PostgreSQL',
    'completed',
    2
),
(
    'Agregar loader de carga',
    'Mostrar spinner mientras cargan las tareas',
    'in_progress',
    3
),
(
    'Implementar eliminación de tareas',
    'Permitir borrar tareas con confirmación',
    'completed',
    2);