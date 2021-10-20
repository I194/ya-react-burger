describe('products management works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should drag and drop ingredients', function() {
    cy.get('a[href*="/ingredients/60d3b41abdacab0026a733c6"] > div').trigger('dragstart').trigger('dragleave');
    cy.get('#drop-target')
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");
  });
}); 