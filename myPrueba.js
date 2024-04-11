const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
async function pickPhoto(driver, screenshotName) {
  const screenshot = await driver.takeScreenshot();
  const screenshotPath = `./screenshots/${screenshotName}.png`;
  if (!fs.existsSync("./screenshots")) {
    fs.mkdirSync("./screenshots");
  }
  fs.writeFileSync(screenshotPath, screenshot, "base64");
}

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "https://www.ochoa.com.do/buscar?departamento=0&param=Lavadora&page=1#"
    );
    await driver.executeScript(`
        var div = document.createElement("div");
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.backgroundColor = '#1e1e1e';
        div.style.color ='white';
        div.style.border = '2px solid #333';
        div.style.padding = '20px';
        div.style.zIndex = '9999';
        div.style.fontSize = '20px'
        div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
        div.style.borderRadius = '10px';
        div.style.width = '50%';
        div.style.maxWidth = '400px';
        div.style.textAlign = 'center';
        div.textContent = 'Historia 1 Añadir carrito';
        document.body.appendChild(div);
        setTimeout(function () {
          div.style.display = "none";
        }, 2000);
    `);
    // PASO UNO'
    const producto1 = await driver.findElement(
      By.css('.anadir_carrito[data-codigo="01-21-1710"]')
    );
    await driver.executeScript("arguments[0].click();", producto1);

    const producto2 = await driver.findElement(
      By.css('.anadir_carrito[data-codigo="01-26-0143"]')
    );
    await driver.executeScript("arguments[0].click();", producto2);

    // await driver
    //   .findElement(By.css('.anadir_carrito[data-codigo="01-21-1710"]'))
    //   .click();
    // await driver
    //   .findElement(By.css('.anadir_carrito[data-codigo="01-26-0143"]'))
    //   .click();
    await driver.findElement(By.id("icono_carrito")).click();

    await driver.sleep(3000);
    // PASO 2
    await driver.executeScript(` var div = document.createElement("div");
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = '#1e1e1e';
    div.style.color ='white';
    div.style.border = '2px solid #333';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.fontSize = '20px'
    div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
    div.style.borderRadius = '10px';
    div.style.width = '50%';
    div.style.maxWidth = '400px';
    div.style.textAlign = 'center';
        div.textContent = 'Historia 2 Buscar un producto';
        document.body.appendChild(div);
        setTimeout(function () {
          div.style.display = "none";
        }, 2000);
    `);
    await driver.wait(until.elementLocated(By.id("term_search")), 10000);

    await driver
      .findElement(By.id("term_search"))
      .sendKeys("TUBO FLEX", Key.RETURN);
    await pickPhoto(driver, "example_screenshot2");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await driver
      .findElement(By.id("term_search"))
      .sendKeys("Producto inexistente", Key.RETURN);
    await pickPhoto(driver, "example_screenshot3");

    // PASO 3
    await driver.executeScript(` var div = document.createElement("div");
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = '#1e1e1e';
    div.style.color ='white';
    div.style.border = '2px solid #333';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.fontSize = '20px'
    div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
    div.style.borderRadius = '10px';
    div.style.width = '50%';
    div.style.maxWidth = '400px';
    div.style.textAlign = 'center';
        div.textContent = 'Historia 3 Ir a un departamento especifico';
        document.body.appendChild(div);
        setTimeout(function () {
          div.style.display = "none";
        }, 2000);
    `);
    await driver.wait(
      until.elementLocated(By.css('.dropdown > a[data-toggle="dropdown"]')),
      10000
    );
    await driver
      .findElement(By.css('.dropdown > a[data-toggle="dropdown"]'))
      .click();

    await driver.wait(
      until.elementsLocated(By.css(".dropdown-menu li a")),
      10000
    );
    await pickPhoto(driver, "example_screenshot4");

    await driver.sleep(3000);

    await driver
      .findElement(By.css('.dropdown-menu li a[href="/catalogo/10"]'))
      .click();
    await pickPhoto(driver, "example_screenshot5");

    await driver.sleep(3000);

    // PASO 4
    await driver.executeScript(` var div = document.createElement("div");
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = '#1e1e1e';
    div.style.color ='white';
    div.style.border = '2px solid #333';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.fontSize = '20px'
    div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
    div.style.borderRadius = '10px';
    div.style.width = '50%';
    div.style.maxWidth = '400px';
    div.style.textAlign = 'center';
        div.textContent = 'Historia 4 visitar diferentes ventanas de la pagina';
        document.body.appendChild(div);
        setTimeout(function () {
          div.style.display = "none";
        }, 2000);
    `);
    await driver.wait(until.elementsLocated(By.css("ul li a")), 10000);

    await driver.findElement(By.css('a[href="/nosotros"]')).click();
    await pickPhoto(driver, "example_screenshot6");
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.css("body")), 10000);

    await driver.findElement(By.css('a[href="/servicios"]')).click();
    await pickPhoto(driver, "example_screenshot7");
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.css("body")), 10000);

    await driver.findElement(By.css('a[href="/contacto"]')).click();
    await driver.sleep(2000);
    await pickPhoto(driver, "example_screenshot8");

    // PASO 5
    await driver.executeScript(` var div = document.createElement("div");
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = '#1e1e1e';
    div.style.color ='white';
    div.style.border = '2px solid #333';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.fontSize = '20px'
    div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
    div.style.borderRadius = '10px';
    div.style.width = '50%';
    div.style.maxWidth = '400px';
    div.style.textAlign = 'center';
        div.textContent = 'Historia 5 Hacer proceso de olvidar contraseña';
        document.body.appendChild(div);
        setTimeout(function () {
          div.style.display = "none";
        }, 2000);
    `);
    await driver.wait(until.elementLocated(By.css(".fa-user")), 10000);

    await driver.findElement(By.css(".fa-user")).click();
    await pickPhoto(driver, "example_screenshot9");

    await driver.wait(until.elementLocated(By.css(".forgot a")), 10000);

    await driver.findElement(By.css(".forgot a")).click();
    await pickPhoto(driver, "example_screenshot10");

    await driver.wait(until.elementLocated(By.css("body")), 10000);
    await driver.wait(until.elementLocated(By.id("email")), 10000);
    await driver
      .findElement(By.id("email"))
      .sendKeys("correodeprueba@gmail.com");
    await driver.wait(
      until.elementLocated(By.css(".btn_c[value='Enviar']")),
      10000
    );
    await driver.findElement(By.css(".btn_c[value='Enviar']")).click();
    await pickPhoto(driver, "example_screenshot11");
  } catch (error) {
    console.error("Error al interactuar con el elemento:", error);
  } finally {
    // await driver.quit();
  }
})();
