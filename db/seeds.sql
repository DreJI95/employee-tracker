INSERT INTO department (department_name)
VALUES
  ('Sales'),('Engineering'),('Finance'),('Legal');

INSERT INTO role (title,salary,department_id)
VALUES
  ('Sales Lead',100000, 1),
  ('Salesperson',80000, 1),
  ('Lead Engineer',150000, 2),
  ('Software Engineer',120000, 2),
  ('Lead Accountant',125000, 3),
  ('Accountant',110000, 3),
  ('Legal Team Lead',250000, 4),
  ('Lawyer',190000, 4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 2, 1),
  ('Peter', 'Greenaway', 3, NULL),
  ('Derek', 'Jarman', 4, 4),
  ('Paolo', 'Pasolini', 4, 4),
  ('Rhoda', 'Williams', 4, 4),
  ('Sandy', 'Powell', 5, NULL),
  ('Emil', 'Zola', 6, 8),
  ('Monica', 'Coalpits', 7, NULL),
  ('Antoinette', 'Capet', 8, 10),
  ('Samuel', 'Delany', 8, 10);