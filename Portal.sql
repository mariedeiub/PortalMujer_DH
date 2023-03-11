CREATE DATABASE  IF NOT EXISTS `portal`;
USE `portal`;

DROP TABLE IF EXISTS `portal`.`producto_categoria`;
DROP TABLE IF EXISTS `portal`.`categorias`;
DROP TABLE IF EXISTS `portal`.`carritos`;
DROP TABLE IF EXISTS `portal`.`detalle_venta`;
DROP TABLE IF EXISTS `portal`.`productos`;
DROP TABLE IF EXISTS `portal`.`ventas`;
DROP TABLE IF EXISTS `portal`.`usuarios`;
DROP TABLE IF EXISTS `portal`.`perfil`;


CREATE TABLE `portal`.`categorias` (
  `categoria_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`categoria_id`));



CREATE TABLE `portal`.`perfil` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));



CREATE TABLE `portal`.`usuarios` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT,
  `perfil_id` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  `localidad` VARCHAR(45) NOT NULL,
  `pais` VARCHAR(45) NOT NULL,
  `edad` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `nombre_usuario` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `foto` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  CONSTRAINT `perfil_id`
    FOREIGN KEY (`perfil_id`)
    REFERENCES `portal`.`perfil` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);




CREATE TABLE `portal`.`ventas` (
  `venta_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `total` DECIMAL(2) NOT NULL,
  PRIMARY KEY (`venta_id`),
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `portal`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);




CREATE TABLE `portal`.`productos` (
  `producto_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `marca` VARCHAR(45) NOT NULL,
  `tamanio` VARCHAR(30) NOT NULL,
  `color` VARCHAR(30) NULL,
  `precio` DECIMAL NOT NULL,
  `fabricante` VARCHAR(45) NULL,
  `modelo` VARCHAR(45) NULL,
  `stock` INT NULL,
  `descuento` INT NULL,
  `imagen` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(300) NULL,
  PRIMARY KEY (`producto_id`));




CREATE TABLE `portal`.`detalle_venta` (
  `detalle_venta_id` INT NOT NULL AUTO_INCREMENT,
  `venta_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL NOT NULL,
  `precio_total` DECIMAL(2) NOT NULL,
  PRIMARY KEY (`detalle_venta_id`),
  CONSTRAINT `venta_id`
    FOREIGN KEY (`venta_id`)
    REFERENCES `portal`.`ventas` (`venta_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `portal`.`productos` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE `portal`.`carritos` (
  `carrito_id` INT NOT NULL  AUTO_INCREMENT,
  `producto_fk` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `estado` BINARY NULL,
  `precio` DECIMAL NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`carrito_id`),
  CONSTRAINT `producto_id_fk`
    FOREIGN KEY (`producto_fk`)
    REFERENCES `portal`.`productos` (`producto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `usuario_id_fk`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `portal`.`usuarios` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    
    CREATE TABLE `portal`.`producto_categoria` (
  `producto_categoria_id` INT NOT NULL AUTO_INCREMENT,
  `producto_fk` INT NOT NULL,
  `categoria_fk` INT NOT NULL,
  PRIMARY KEY (`producto_categoria_id`),
  CONSTRAINT `producto_fk`
    FOREIGN KEY (`producto_fk`)
    REFERENCES `portal`.`productos` (`producto_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `categoria_fk`
    FOREIGN KEY (`categoria_fk`)
    REFERENCES `portal`.`categorias` (`categoria_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

    
INSERT INTO `categorias` VALUES (1,'Accesorios'), (2,'Lenceria'), (3,'Indumentaria'), (4,'Cosmeticos'), (5,'Cuidado Personal');

INSERT INTO `perfil` VALUES (1,'administrador'), (2,'cliente');
    
INSERT 
INTO `productos` 
VALUES 	(1,'Mini Cartera Imporatada','Moka','18x14 ','Negra',7500,'Moka Oficial','MK123',5,20,'/images/products/img-1676846896375.jpg','Características:- Herrajes Dorados.- Correa de Cadena Dorado.- Correa Regulable.'),
	(2,'Labial','Dorothy Gray','1g ','Bronze',1600,'Dorothy Gray','LB159',5,0,'/images/products/img-1676846896375.png','Lápiz Labial hipoalergénico -Con Vitamina E, Manteca de Karité y Filtro Solar.'),
	(3,'Máscara cabello grueso','Kérastase','200ml','Rojo',14095,'Kérastase','Nutritive Masquintense',5,15,'/images/products/img-1676848364324.png','El camino hacia un cabello perfecto requiere de un cuidado especial, y hoy podés lograr ese cambio de la mano de Kérastase.'),
	(4,'Conjunto Bralette De Encaje','New Sensation','90','Negro',3250,'New Sensation','3526',5,30,'/images/products/img-1676848809036.png','De la nueva coleccion de New Sesation, llega este nuevo conjunto de Corpiño y Bombacha'),
	(5,'Lentes de sol','Las oreiro','unico','Negro',2600,'Las Oreiro','6150',15,2,'/images/products/img-1676849441845.png','La selección de anteojos de sol de calidad es fundamental para garantizar el cuidado de la vista. Los lentes protegen los ojos de los rayos UV y mejoran la visibilidad, ya que reducen el reflejo que ocasiona la luz solar.'),
	(6,'Short con lazo Mujer','Locomolo','36 ','Negro',5200,'Lomolo','LC23',7,5,'/images/products/img-1678074437743.PNG','Short negro con lazo, de Bengalina elastizdo. Coleccion Primavera/Verano 2023'),
        (7,'Sombra de ojos','Maybelline','6 ','Bronce',12500,'Maybelline','The city mini pallet',12,30,'/images/products/img-1678074661881.jpg',' Creá #InfinitasCombinaciones con la paleta de Sombra de ojos Maybelline The City Mini Palette Rooftop Bronzes.¡6 tonos satinados ultra pigmentados para tu maquillaje de ojos!'),
	(8,'Bolso PU','Sixta Ugarte ','44X36X14 ','Suela',15800,'Nina XL','Nina XL',1,0,'/images/products/img-1678075149487.png',' Con tu Sixta Ugarte Nina XL completarás cualquier indumentaria y potenciarás tu forma de vestir. Es un elemento indispensable para llevar lo que necesites a todas partes, sin preocuparte por perder las llaves, el celular o la billetera.'),
	(9,'Perfume','Nina Ricci','80ml ','Rojo',31500,'Nina','Les Belles',4,20,'/images/products/img-1678075537512.png',' La fragancia Nina Rouge eau de toilette ofrece la frescura perfecta para épocas de calor. Al caracterizarse por sus aromas ligeros podés usar la cantidad que quieras sin miedo a excederte.'),
	(10,'Anteojos de sol','Tiffany','One Size ','Marron',37000,'Tiffany','3329',7,12,'/images/products/img-1678076174482.png',' Material: Acetato Marca: Tiffany Modelo: 3329 Color: C09 Marron traslucido. Cristales sepia polarizado C03 Negro, cristales gris azulado degradee polarizado Medidas: Largo 140 mm. Alto 47 mm. Diametro del cristal 53 mm. Puente 17 mm. Patillas 145 mm.');


INSERT 
INTO `producto_categoria` 
VALUES 	(1,1,1), (2,1,2), (3,2,4), (4,4,2), (5,4,3),(6,5,1), (7,3,5),
		(8,6,3), (9,7,4), (10,7,5), (11,8,1), (12,8,3),(13,9,5), (14,10,1);

INSERT 
INTO `usuarios` 
VALUES (1,1, 'Marianela', 'Deiub', 'Bolivia 121', 'Buenos Aires', 'Argentina', 29, 'mariedeiub@gmail.com', 'MarieDeiub' , '$2b$10$IqHOG9zVDzZ2JFSUN.8dJOq6KIydQsVM4LTWejMOmJy5lqR9ISyc.', '/images/users/foto-1676999773969.png'),
(2,2, 'Leandro', 'Corteze', 'Chile 523', 'Cordoba', 'Argentina', 31, 'leandrocorteze@gmail.com', 'LeanCorteze' , '$2b$10$L5Yfv6LgrAT8G.kYPLx92.7pkiz/mQJzFBs4b/.I5AaW98A9i8MH2', '/images/users/default-image.png'),
(3,2, 'Sofia', 'Sanchez', 'Primera Junta 11', 'Buenos Aires', 'Argentina', 65, 'sofiSanchez@gmail.com', 'Sofia_Sanchez' , '$2b$10$SGk7oImwcOEkjbrcjobWdOHiUXghNbJA9WUV5A1uoKTK/74MAaRP.', '/images/users/foto-1677728975757.jpg'),
(4,2, 'Julieta', 'Poyo', 'Verde 585', 'Cordoba', 'Argentina', 46, 'JuliP@gmail.com', 'Juli' , '$2b$10$JkbvVhsMdm5SoEo9qV4xyuMCD7vrH4JKo4IGKbUDwSNfslatESx7.', '/images/users/default-image.png'),
(5,2, 'Romina', 'Pereyra', 'Solana 215', 'Buenos Aires', 'Argentina', 25, 'romiP@gmail.com', 'RomiPereyra' , '$2b$10$dUkzCJRswFFzcsTnH5t0Bu18hbmg3lthkiewZmGnq5NHoUJqyukAC', '/images/users/foto-1677813299151.png'),
(6,2, 'Ariel', 'Fernandez', 'Peru 1158', 'Rio Negro', 'Argentina', 22, 'AriFer@gmail.com', 'Fernandez' , '$2b$10$ICIVR/A3IkcifPfoBTbM6.Lm0/ZA0fevE9nwRx2vNZ/gDgQ3Q3avS', '/images/users/foto-1677813409571.png'),
(7,2, 'Marcos', 'Deiub', 'Los clavesles 204', 'Neuquen', 'Argentina', 22, 'AriFer@gmail.com', 'Fernandez' , '$2b$10$ICIVR/A3IkcifPfoBTbM6.Lm0/ZA0fevE9nwRx2vNZ/gDgQ3Q3avS', '/images/users/foto-1677813409571.png');



INSERT 
INTO `carritos` 
VALUES 	(1,1,1,null,7500,1), (2,5,1,null,2600,1), (3,2,2,null,1600,1), (4,1,2,null,7500,1), 
	(5,4,1,null,3250,1), (6,3,1,null,14095,1), (7,9,3,null,31500,1), (8,2,3,null,1600,1),
        (9,9,4,null,31500,1), (10,1,4,null,7500,1);