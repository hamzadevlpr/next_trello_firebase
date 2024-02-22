describe("trello check", () => {
  it("passes", () => {
    cy.viewport(1080, 900);
    cy.visit("http://localhost:3000/login");
    // Enter the email
    cy.get('[data-id="email"]').type("malik@gmail.com");
    // cy.wait(20000);
    // Enter the password
    cy.get('[data-id="password"]').type("00000000");
    cy.wait(2000);
    // login
    cy.get('[data-id="loginbtn"]').click();
    cy.wait(2000);
    // add first column
    cy.get('[data-columnId="addColumn"]').click();
    cy.wait(2000);
    // edit column
    cy.get('div[data-title="columnTitle"]').click();
    cy.get('input[data-columnId="title"]')
      .clear()
      .type("Hamza Malik")
      .type("{enter}");
    cy.wait(2000);

    // delete column
    
    // add first task
    cy.get('button[data-task="addTask"]').click();
    cy.wait(2000);
    // edit task
    cy.get('input[data-task="taskTitle"]')
      .clear()
      .type("Xeverse.io")
      .type("{enter}");
    cy.wait(2000);
    // add second task
    cy.get('button[data-task="addTask"]').click();
    cy.wait(2000);
    cy.get('input[data-task="taskTitle"]')
      .clear()
      .type("New Task 01")
      .type("{enter}");

    // add scond column
    cy.get('[data-columnId="addColumn"]').click();
    cy.wait(2000);

    // check if second column name matches to "Column 2"
    cy.get('div[data-title="columnTitle"]').each(($column) => {
      cy.wrap($column)
        .invoke("text")
        .then((text) => {
          if (text.trim() === "Column 2") {
            cy.wrap($column).click();
            cy.get('input[data-columnId="title"]')
              .clear()
              .type("Ahsan Khan")
              .type("{enter}");
            cy.wait(2000);
          } else {
            cy.log("Column 2 not found");
          }
        });
    });

    cy.get('div[data-columns="columns"]')
      .find('div[data-columnContainer="columnContainer"]')
      .each(($ele) => {
        if ($ele.text().includes("Ahsan Khan")) {
          //add first task
          cy.wrap($ele).find('button[data-task="addTask"]').click();
          cy.get('input[data-task="taskTitle"]')
            .clear()
            .type("Ahsan Khan Task 01")
            .type("{enter}");
          cy.wait(2000);
          //add second task
          cy.wrap($ele).find('button[data-task="addTask"]').click();
          cy.get('input[data-task="taskTitle"]')
            .clear()
            .type("Ahsan Khan Task 02")
            .type("{enter}");
          cy.wait(2000);
          cy.wrap($ele).find('button[data-task="addTask"]').click();
          cy.get('input[data-task="taskTitle"]')
            .clear()
            .type("Ahsan Khan Task 023")
            .type("{enter}");
          cy.wait(2000);
        }
      });
    cy.wait(2000);
    cy.get('div[data-columns="columns"]')
      .find('div[data-columnContainer="columnContainer"]')
      .each(($ele) => {
        if ($ele.text().includes("Hamza Malik")) {
          cy.wrap($ele).find('button[data-columnId="deleteColumn"]').click();
          cy.wait(2000);
        }
      });


  });
});
