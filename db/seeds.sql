INSERT INTO departments (dept_name)
VALUES ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, salary, dept_id)
VALUES ('Sales Lead', 100000, 1),
        ('SalesPerson', 80000, 1),
        ('Lead Engineer', 180000, 2),
        ('Software Engineer', 125000, 2),
        ('Account Manager', 120000, 3),
        ('Accountant', 70000, 3),
        ('Lawyer', 190000, 4),
        ('Legal Team Lead', 220000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
        ('Mike', 'Chan', 2),
        ('Ashley', 'Rodriquez', 3),
        ('Kevin', 'Tupik', 4),
        ('Kunal', 'Singh', 5),
        ('Malia', 'Brown', 6),
        ('Sarah', 'Lourd', 7),
        ('Tom', 'Allen', 8);

UPDATE employees SET manager_id = 1 WHERE id = 2;
UPDATE employees SET manager_id = 3 WHERE id = 4;
UPDATE employees SET manager_id = 5 WHERE id = 6;
UPDATE employees SET manager_id = 7 WHERE id = 8;