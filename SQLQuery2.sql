create database mapa_recarga
go
use mapa_recarga;

create table centros_recarga (
id int identity(1,1) primary key,
nombre nvarchar (100),
tipo nvarchar(50),
lat float,
ing float,
diponibilidad nvarchar(20),
espacios int,
);
insert into centros_recarga (nombre, tipo, lat, ing, diponibilidad, espacios)
values 
('plaza sendero','rapida', 19.3033, -98.8825, 'disponible',5),
('plaza ixtapaluca','media', 19.3185, -9890,'ocupado', 0 );
 
use mapa_recarga;
INSERT INTO centros_recarga (nombre, tipo, lat, ing, espacios)
VALUES 
('Plaza Sendero', 'Rápida', 19.3033, -98.8825, 5),
('Plaza Centro', 'Media', 19.3185, -98.8890, 2),
('Plaza Ixtapaluca', 'Lenta', 19.3200, -98.8800, 1);
SELECT @@SERVERNAME;
CREATE LOGIN sombra WITH PASSWORD = '2004';

USE mapa_recarga;

CREATE USER sombra FOR LOGIN sombra;

ALTER ROLE db_owner ADD MEMBER sombra;
