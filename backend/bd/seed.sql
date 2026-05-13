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
    11
),
(
    'Corregir bug navbar',
    'Navbar se sobrepone en móviles',
    'in_progress',
    10
),
(
    'Mejorar estilos dashboard',
    'Agregar responsive design',
    'completed',
    12
);