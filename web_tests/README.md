# Testes Web E2E (Cypress)

Testes automatizados da aplicação DemoQA usando Cypress.

📖 **[Passo a passo: como criar testes E2E](PASSO_A_PASSO.md)** — guia simples do zero.

## Cenário: Practice Form

1. Acessa https://demoqa.com/
2. Clica em **Forms** na página inicial
3. Clica no submenu **Practice Form**
4. Preenche o formulário com valores aleatórios (Faker)
5. Faz upload do arquivo `fixtures/sample-upload.txt`
6. Submete o formulário
7. Verifica que um popup foi aberto
8. Fecha o popup

## Instalação

```bash
cd web_tests
npm install
```

## Testes disponíveis

| Arquivo | Descrição |
|---------|-----------|
| practice-form.cy.js | Formulário com upload, submit e popup |
| browser-windows.cy.js | Nova janela, validar mensagem e fechar |
| web-tables.cy.js | Criar, editar e deletar 1 registro |
| progress-bar.cy.js | Start, parar antes de 25%, validar, completar 100% |
| sortable.cy.js | Drag and drop para ordenar em ordem crescente |

## Executar testes

```bash
cd web_tests
npm install

# Todos os testes
npm run test

# Apenas um teste específico
npm run test -- --spec "cypress/e2e/web-tables.cy.js"

# Modo interativo
npm run cy:open
```
