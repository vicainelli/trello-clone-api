# Trello Api Clone

This is a project to study NodeJS, AdonisJs, MongoDB and TDD

## To Do

### User / Session
- [x] Create
  - [x] Tests
  - [x] Validations
- [ ] Update
- [ ] Delete/Destroy

### Board
- [x] Create
  - [x] Tests
  - [x] Validations
- [x] Update
- [ ] Delete/Destroy
#### Relationship
`User N:N Boards`

### Card
- [ ] Create
- [ ] Update
- [ ] Show
- [ ] Delete/Destroy
#### Relationship
`Board 1:N Cards`

### Labels
- [ ] Create
- [ ] Update
- [ ] Show
- [ ] Delete/Destroy
#### Relationship
`Card N:N Labels`

### Files
- [ ] Create
- [ ] Update
- [ ] Show
- [ ] Delete/Destroy
#### Relationship
`Card 1:N Files`

### Comments
- [ ] Create
- [ ] Update
- [ ] Show
- [ ] Delete/Destroy

#### Relationship
`Card 1:N Comments`
`User 1:N Comments`

### Activity
- [ ] Create
- [ ] Update
- [ ] Show
- [ ] Delete/Destroy
#### Relationship
`Card 1:N Activities`
`User 1:N Activities`
