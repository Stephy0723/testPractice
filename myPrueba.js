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
    // PASO 1
    await driver.wait(
      until.elementLocated(By.css('.anadir_carrito[data-codigo="01-21-1710"]')),
      10000
    );
    await driver
      .findElement(By.css('.anadir_carrito[data-codigo="01-21-1710"]'))
      .click();
    await driver
      .findElement(By.css('.anadir_carrito[data-codigo="01-26-0143"]'))
      .click();
    setTimeout(async () => {
      await driver.findElement(By.id("icono_carrito")).click();
    }, 2000);
    await pickPhoto(driver, "example_screenshot");
    // PASO 2
    await driver.wait(until.elementLocated(By.id("term_search")), 10000);

    await driver
      .findElement(By.id("term_search"))
      .sendKeys("TUBO FLEX", Key.RETURN);
    await pickPhoto(driver, "example_screenshot");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await driver
      .findElement(By.id("term_search"))
      .sendKeys("Producto inexistente", Key.RETURN);
    await pickPhoto(driver, "example_screenshot");

    // PASO 3
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
    await pickPhoto(driver, "example_screenshot");

    setTimeout(async () => {
      await driver
        .findElement(By.css('.dropdown-menu li a[href="/catalogo/10"]'))
        .click();
      await pickPhoto(driver, "example_screenshot");
    }, 3000);

    // PASO 4
    await driver.wait(until.elementsLocated(By.css("ul li a")), 10000);

    await driver.findElement(By.css('a[href="/nosotros"]')).click();
    await pickPhoto(driver, "example_screenshot");
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.css("body")), 10000);

    await driver.findElement(By.css('a[href="/servicios"]')).click();
    await pickPhoto(driver, "example_screenshot");
    await driver.sleep(2000);
    await driver.wait(until.elementLocated(By.css("body")), 10000);

    await driver.findElement(By.css('a[href="/contacto"]')).click();
    await driver.sleep(2000);
    await pickPhoto(driver, "example_screenshot");

    // PASO 5
    await driver.wait(until.elementLocated(By.css(".fa-user")), 10000);

    await driver.findElement(By.css(".fa-user")).click();
    await pickPhoto(driver, "example_screenshot");

    await driver.wait(until.elementLocated(By.css(".forgot a")), 10000);

    await driver.findElement(By.css(".forgot a")).click();
    await pickPhoto(driver, "example_screenshot");

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
    await pickPhoto(driver, "example_screenshot");
  } catch (error) {
    console.error("Error al interactuar con el elemento:", error);
  } finally {
    // await driver.quit();
  }
})();
