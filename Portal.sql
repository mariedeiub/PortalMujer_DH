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
  `producto_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `estado` BINARY NULL,
  `precio` DECIMAL NOT NULL,
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`carrito_id`),
  CONSTRAINT `producto_id_fk`
    FOREIGN KEY (`producto_id`)
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
    
    
INSERT INTO `productos` VALUES 	(1,'Mini Cartera Imporatada','Moka','18x14 ','Negra',7500,'Moka Oficial','MK123',5,20,'/images/products/img-1676846896375.jpg','Características:- Herrajes Dorados.- Correa de Cadena Dorado.- Correa Regulable.'),
								(2,'Labial','Dorothy Gray','1g ','Bronze',1600,'Dorothy Gray','LB159',5,0,'/images/products/img-1676846896375.png','Lápiz Labial hipoalergénico -Con Vitamina E, Manteca de Karité y Filtro Solar.'),
                                (3,'Máscara cabello grueso','Kérastase','200ml','Rojo',14095,'Kérastase','Nutritive Masquintense',5,15,'/images/products/img-1676848364324.png','El camino hacia un cabello perfecto requiere de un cuidado especial, y hoy podés lograr ese cambio de la mano de Kérastase.'),
                                (4,'Conjunto Bralette De Encaje','New Sensation','90','Negro',3250,'New Sensation','3526',5,30,'/images/products/img-1676848809036.png','De la nueva coleccion de New Sesation, llega este nuevo conjunto de Corpiño y Bombacha'),
                                (5,'Lentes de sol','Las oreiro','unico','Negro',2600,'Las Oreiro','6150',15,2,'/images/products/img-1676849441845.png','La selección de anteojos de sol de calidad es fundamental para garantizar el cuidado de la vista. Los lentes protegen los ojos de los rayos UV y mejoran la visibilidad, ya que reducen el reflejo que ocasiona la luz solar.');


INSERT INTO `categorias` VALUES (1,'Accesorios'), (2,'Lenceria'), (3,'Indumentaria'), (4,'Cosmeticos'), (5,'Cuidado Personal');

INSERT INTO `perfil` VALUES (1,'administrador'), (2,'cliente');

INSERT INTO `producto_categoria` VALUES (1,1,1), (2,1,2), (3,2,4), (4,4,2), (5,4,3),(6,5,1), (7,3,5);