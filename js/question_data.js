var topics_and_subtopics = {
  data:[
    {
        parent: "Algebra*",
        children: ["Equations*","Simplification"],
    },
    {
        parent: "Data",
        children: ["Representing data"],
    },
    {
        parent: "Number*",
        children: ["Decimals*","Percentages*"],
    },
    {
        parent: "Shape",
        children: ["Symmetry"],
    },
  ]
}

var subtopics_and_titles = {
  data:[
          {
            parent:"Percentages*",
            children:["Calculate the percentage change*","Finding percentages"],
          },
          {
            parent:"Decimals*",
            children:["Adding and subtracting decimals","Dividing decimals*"],
          },
          {
            parent:"Equations*",
            children:["Solving one step equations","Solving with unknowns on both sides*"],
          },

  ]
}

var titles_and_questions = {
  data: [
          {
            parent:"Calculate the percentage change*",
            children:[
                        { question:'The percentage Increase when £20 changes to £21', answer:'A 5% Increase', },
                        { question:'The percentage Increase when £40 changes to £42', answer:'A 5% Increase', },
                        { question:'The percentage decrease when 70cm changes to 63cm', answer:'A 10% decrease', },
                        { question:'The percentage decrease when 90kg changes to 81kg', answer:'A 10% decrease', },
                        { question:'The percentage Increase when 20cm changes to 23cm', answer:'A 15% Increase', },
                        { question:'The percentage Increase when 40kg changes to 46kg', answer:'A 15% Increase', },
                        { question:'The percentage decrease when 70cm changes to 56cm', answer:'A 20% decrease', },
                        { question:'The percentage decrease when £90 changes to £72', answer:'A 20% decrease', },
                        { question:'The percentage Increase when 20cm changes to 26cm', answer:'A 30% Increase', },
                        { question:'The percentage Increase when £40 changes to £52', answer:'A 30% Increase', },
                        { question:'The percentage decrease when 70cm changes to 52.5cm', answer:'A 25% decrease', },
                        { question:'The percentage decrease when £90 changes to £67.5', answer:'A 25% decrease', },
                        { question:'The percentage Increase when 20cm changes to 23.4cm', answer:'A 17% Increase', },
                        { question:'The percentage Increase when 40kg changes to 46.8kg', answer:'A 17% Increase', },
                        { question:'The percentage decrease when 70cm changes to 67.9cm', answer:'A 3% decrease', },
                        { question:'The percentage decrease when 90kg changes to 87.3kg', answer:'A 3% decrease', },
                        { question:'The percentage Increase when 20cm changes to 20.3cm', answer:'A 1.5% Increase', },
                        { question:'The percentage Increase when £40 changes to £40.6', answer:'A 1.5% Increase', },
                    ]
          },
          {
            parent:"Dividing decimals*",
            children:[
                          { question:'Find the value of:     2.8 ÷ 0.4', answer:'7', },
                          { question:'Find the value of:     5.6 ÷ 0.7', answer:'8', },
                          { question:'Find the value of:     1.8 ÷ 0.2', answer:'9', },
                          { question:'Find the value of:     8.8 ÷ 0.8', answer:'11', },
                          { question:'Find the value of:     6.5 ÷ 0.5', answer:'13', },
                          { question:'Find the value of:     13.5 ÷ 0.9', answer:'15', },
                          { question:'Find the value of:     10.5 ÷ 0.5', answer:'21', },
                          { question:'Find the value of:     16.2 ÷ 0.3', answer:'54', },
                          { question:'Find the value of:     25.2 ÷ 0.4', answer:'63', },
                          { question:'Find the value of:     11.8 ÷ 0.2', answer:'59', },
                          { question:'Find the value of:     34.3 ÷ 0.7', answer:'49', },
                          { question:'Find the value of:     3.08 ÷ 0.11', answer:'28', },
                          { question:'Find the value of:     7.2 ÷ 0.4', answer:'18', },
                          { question:'Find the value of:     15.61 ÷ 0.7', answer:'22.3', },
                          { question:'Find the value of:     14.08 ÷ 0.4', answer:'35.2', },
                          { question:'Find the value of:     64.89 ÷ 0.9', answer:'72.1', },
                          { question:'Find the value of:     38.22 ÷ 0.6', answer:'63.7', },
                          { question:'Find the value of:     109.8 ÷ 1.2', answer:'91.5', },
                    ],
          },
          {
            parent:"Solving with unknowns on both sides*",
            children:[
                        { question:'Solve: 5x  + 7 = 2x  + 28', answer:'x = 7', },
                        { question:'Solve: 5x  - 1 = 4x  + 3', answer:'x = 4', },
                        { question:'Solve: 6x  - 2 = 5x  + 4', answer:'x = 6', },
                        { question:'Solve: 4x  + 13 = 6x  + 3', answer:'x = 5', },
                        { question:'Solve: 6x  - 2 = 5 - x ', answer:'x = 1', },
                        { question:'Solve: 5x  + 11 = 35 - 3x ', answer:'x = 3', },
                        { question:'Solve: 6x  + 17 = 5x  + 25', answer:'x = 8', },
                        { question:'Solve: 4x  + 5 = 8x  - 31', answer:'x = 9', },
                        { question:'Solve: 2x  + 11 = 8x  - 49', answer:'x = 10', },
                        { question:'Solve: 8x  + 6 = 7x  + 8.5', answer:'x = 2.5', },
                        { question:'Solve: 4x  + 11 = 17 - x ', answer:'x = 1.2', },
                        { question:'Solve: 5x  + 8 = 18 - 3x ', answer:'x = 1.25', },
                        { question:'Solve: 11x  + 4 = 7x  + 10', answer:'x = 1.5', },
                        { question:'Solve: 3x  + 3.2 = 5x  - 0.8', answer:'x = 2', },
                        { question:'Solve: 6x  + 12.5 = 2x  + 26.5', answer:'x = 3.5', },
                        { question:'Solve: 2x  + 15.1 = 6x  - 2.9', answer:'x = 4.5', },
                        { question:'Solve: 4.4x  + 3.2 = 3.8x  + 10.4', answer:'x = 12', },
                        { question:'Solve: 5.5x  + 3 = 4.6x  + 15.6', answer:'x = 14', },
                    ]
          },
  ]
}
