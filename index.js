// Require modules
const prompt = require('prompt-sync')();
var menu = require('console-menu');

const toDoList = [];

const options = [
  "Afficher les elements",
  "Ajouté un element",
  "Modifier un element",
  "Supprimer un element"
]

const numberOptions = parseInt(options.length);
const menuOptions = []
for (const option in options) {
  menuOptions.push({ hotkey: parseInt(option) + 1, title: options[option] })
}

menuOptions.push({ separator: true }); menuOptions.push({ hotkey: 99, title: 'Quitté' })
main()

async function main() {
  while (true) {
    await menu(menuOptions, {
      header: 'Menu Principal',
      border: true,
    }).then(item => {
      console.clear()
      let choise = JSON.parse(JSON.stringify(item)).hotkey;

      if (!isNaN(choise)) {

        choise = parseInt(choise);
        switch (choise) {
          case 1:
            console.log('\n======= Element de la Liste =======')
            if (toDoList.length != 0) {
              for (const key in toDoList) {
                console.log(`${parseInt(key) + 1}. ${toDoList[key].name} | ${toDoList[key].status ? "✅" : "❌"}`);
              }
            } else console.log('La liste est vide.')
            await logger("separator", false, null);
            break;

          default:
            break;
        }
        if (choise == 1) {
          console.log('\n======= Element de la Liste =======')
          if (toDoList.length != 0) {
            for (const key in toDoList) {
              console.log(`${parseInt(key) + 1}. ${toDoList[key].name} | ${toDoList[key].status ? "✅" : "❌"}`);
            }
          } else console.log('La liste est vide.')
          await logger("separator", false, null);
        } else if (choise == 2) {
          console.log('\n======= Nouvelle Element =======')
          let nameNewElements = prompt(`Nom de l'element : `);

          await logger("separator", true, null);
          console.info(`L'element ${nameNewElements} a été ajouté à la liste.`)
          toDoList.push({ name: nameNewElements, status: false })
        } else if (choise == 3) {
          console.log('\n======= Modification Element =======')
          if (toDoList.length != 0) {
            let idModElements = prompt(`Numéro de l'element a Modifier : `);
            let newstatusElement = prompt(`L'element a-t-il été effectué ? [1/2] : `);

            if (!isNaN(idModElements) && !isNaN(newstatusElement)) {
              idModElements = parseInt(idModElements);
              newstatusElement = parseInt(newstatusElement);

              if (idModElements > 0 && idModElements < toDoList.length + 2) {

                if (newstatusElement > 0 && newstatusElement < 3) {

                  let saveElement = toDoList[idModElements - 1];
                  toDoList.splice(idModElements - 1, 1);
                  toDoList.unshift({ name: saveElement.name, status: newstatusElement == 1 ? true : false });

                } else console.log('Veuillez entrer un numéro [1/2].')
              } else console.log(`Veuillez entrer un nombre entre 1-${toDoList.length + 1}.`)
            } else console.log('Veuillez entrer un nombre')
          } else console.log("Aucun element n'a supprimé car la lite est vide.")

          await logger("separator", false, null);

        } else if (choise == 4) {
          console.log('\n======= Supprimer un element =======')

          if (toDoList.length != 0) {
            let idSupElements = prompt(`Numéro de l'element a supprimé : `);

            if (!isNaN(idSupElements)) {
              idSupElements = parseInt(idSupElements);

              if (idSupElements > 0 && idSupElements < toDoList.length + 2) {
                toDoList.splice(idSupElements - 1, 1);
              } else console.log(`Veuillez entrer un nombre entre 1-${toDoList.length + 1}.`)
            } else console.log('Veuillez entrer un nombre')
          } else console.log("Aucun element n'a supprimé car la lite est vide.")

          await logger("separator", false, null);
        } else if (choise == 99) {
          process.exit();
        }
      } else console.log('Veuillez entrer un nombre')
    });
  }
}

/**
 * 
 * @param {string} loggerName 
 * @param {boolean} backLine 
 * @param {string} content 
 */
async function logger(loggerName, backLine, content) {
  switch (key) {
    case "title":
      await console.log(`${backLine ? "\n" : ""}======= ${backLine ? content : "No Name"} =======`)
      break;

    case "separator":
      await console.log(`${backLine ? "\n" : ""}====================================`)
      break;

    default:
      break;
  }
}