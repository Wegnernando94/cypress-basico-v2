/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {    
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = ' TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE ,  TESTE'

    cy.get('#firstName').type('Fernando')
    cy.get('#lastName').type('Wegner')
    cy.get('#email').type('wegnernando@gmail.com', {delay: 0})
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulario com um email com formatação', function(){
    cy.get('#firstName').type('Fernando')
    cy.get('#lastName').type('Wegner')
    cy.get('#email').type('wegnernando@gmail,com', {delay: 0})
    cy.get('#open-text-area').type ('test')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com valor não-numerico', function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value','')

  })

  it.only('exibe mensagem de erro quando o teletone se torna obrigatorio mas nao e preenchido antes do envio do formulário',function(){
    cy.get('#firstName').type('Fernando')
    cy.get('#lastName').type('Wegner')
    cy.get('#email').type('wegnernando@gmail.com', {delay: 0})
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })
})