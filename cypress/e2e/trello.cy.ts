describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    // cy.visit('https://vishalok12.github.io/jquery-dragarrange/')
    cy.wait(2000);


    // login to the app
    cy.get('input[name=email]').type('malik@gmail.com');
    cy.wait(1000);
    cy.get('input[name=password]').type('00000000');
    cy.wait(1000);
    cy.get('button[type=submit]').click();
    cy.wait(5000);

    // create a first column
    cy.get('button[button-click="add-column"]').click();
    cy.wait(1000);

    cy.get('div[data-title="columnTitle"]').click().clear();
    cy.wait(1000);
    cy.get('input[title="columnTitle"]')
      .clear()
      .type("Malik Column")
      .type("{enter}");
    cy.wait(1000);

    // add first task
    cy.get('button[btn-task="addTask"]').click();
    cy.wait(1000);
    cy.get('button[title="Edit Task"]').click();
    cy.wait(1000);
    cy.get('p[contenteditable="true"]').clear().type('Malik Task 01');
    cy.wait(1000);
    cy.get('button[title="Save Task"]').click();
    cy.wait(1000);

    // add second task
    cy.get('button[btn-task="addTask"]').click();
    cy.wait(1000);
    cy.get('button[title="Edit Task"]').eq(1).click();
    cy.wait(1000);
    cy.get('p[contenteditable="true"]').clear().type('Malik Task 02');
    cy.wait(1000);
    cy.get('button[title="Save Task"]').click();
    cy.wait(1000);

    // add third task
    cy.get('button[btn-task="addTask"]').click();
    cy.wait(1000);
    cy.get('button[title="Edit Task"]').eq(2).click();
    cy.wait(1000);
    cy.get('p[contenteditable="true"]').clear().type('Malik Task 03');
    cy.wait(1000);
    cy.get('button[title="Save Task"]').click();
    cy.wait(1000);

    // add fourth task
    cy.get('button[btn-task="addTask"]').click();
    cy.wait(1000);
    cy.get('button[title="Edit Task"]').eq(3).click();
    cy.wait(1000)
    cy.get('p[contenteditable="true"]').clear().type('Malik Task 04');
    cy.wait(1000);
    cy.get('button[title="Save Task"]').click();
    cy.wait(1000);

    cy.get('div[handle-task="handleTask"]').first().drag('div[handle-task="handleTask"]:contains("task 01")', { force: true });
    cy.get('div[handle-task="handleTask"]')
      .contains('Malik Task 04')
      .parent()
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientX: 0, clientY: 100 }) // Adjust the coordinates as needed
      .trigger('mouseup', { force: true });


    // create a second column
    // cy.get('button[button-click="add-column"]').click();
    // cy.wait(1000);

    // cy.get('div[data-title="columnTitle"]').eq(1).click().clear();
    // cy.wait(1000);
    // cy.get('input[title="columnTitle"]')
    //   .clear()
    //   .type("Junaid Column")
    //   .type("{enter}");
    // cy.wait(1000);

    // add first task
    // cy.get('button[btn-task="addTask"]').eq(1).click();
    // cy.wait(1000);
    // cy.get('button[title="Edit Task"]').eq(2).click();
    // cy.wait(1000);
    // cy.get('p[contenteditable="true"]').clear().type('Junaid Task 01');
    // cy.wait(1000);
    // cy.get('button[title="Save Task"]').click();
    // cy.wait(1000);

    // add second task
    // cy.get('button[btn-task="addTask"]').eq(1).click();
    // cy.wait(1000);
    // cy.get('button[title="Edit Task"]').eq(3).click();
    // cy.wait(1000);
    // cy.get('p[contenteditable="true"]').clear().type('Junaid Task 02');
    // cy.wait(1000);
    // cy.get('button[title="Save Task"]').click();
    // cy.wait(1000);

    // delete first task
    // cy.get('button[title="Delete Task"]').eq(1).click();
    // cy.wait(1000);

    // Drag the remaining task to a different location using cypress-plugin-drag-drop
    cy.get('div[handle-task="handleTask"]').first().drag('div[handle-task="handleTask"]')



    // cy.get('div[handle-task="handleTask"]').eq(0)
    //   .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
    //   .trigger('mousemove', { which: 3, pageX: 600, pageY: 600 })
    //   .trigger('mouseup')

    // cy.get('div[handle-task="handleTask"]').eq(0).trigger('mouseover') // yields 'button'

    // cy.get('div[ handle-task="handleTask"]').eq(0).drag('div[data-task="taskContainer"]');

    // delete first column
    // cy.get('button[title="deleteColumn"]').eq(1).click();
    // cy.wait(1000);

  })
})