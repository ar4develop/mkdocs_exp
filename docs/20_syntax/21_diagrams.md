## Diagrams

Source links:    
[About Mermaid](http://mermaid.js.org/)
[A diagrams plugin for Mkdocs](https://mkdocs-mermaid2.readthedocs.io/en/latest/)    
[MagicSpace Draw. Diagrams](https://mkdocs-magicspace.alnoda.org/tutorials/markdown/diagrams/)
[MkDocs Material. Diagrams](https://squidfunk.github.io/mkdocs-material/reference/diagrams/)

Local article [MkDocs Material. Diagrams](../00_articles/Diagrams - Material for MkDocs.html)

Diagrams help to communicate complex relationships and interconnections between different technical components, and are a great addition to project documentation. Material for MkDocs integrates with Mermaid.js, a very popular and flexible solution for drawing diagrams.

**Configuration**

This configuration enables native support for Mermaid.js diagrams. Material for MkDocs will automatically initialize the JavaScript runtime when a page includes a mermaid code block:

```
markdown_extensions:
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
```

**Usage**

### Flowcharts

[Flowcharts](https://mermaid-js.github.io/mermaid/#/flowchart) are diagrams that represent workflows or processes. The steps are rendered as nodes of various kinds and are connected by edges, describing the necessary order of steps:
Flow chart

    ``` mermaid
    graph LR
    A[Start] --> B{Error?};
    B -->|Yes| C[Hmm...];
    C --> D[Debug];
    D --> B;
    B ---->|No| E[Yay!];
    ```

``` mermaid
graph LR
A[Start] --> B{Error?};
B -->|Yes| C[Hmm...];
C --> D[Debug];
D --> B;
B ---->|No| E[Yay!];
```

### Using sequence diagrams




Sequence diagrams describe a specific scenario as sequential interactions between multiple objects or actors, including the messages that are exchanged between those actors:

    ``` mermaid title="Sequence diagram"
    sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
    ```

``` mermaid 
sequenceDiagram
  autonumber
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```


### Using state diagrams

State diagrams are a great tool to describe the behavior of a system, decomposing it into a finite number of states, and transitions between those states:

    ``` mermaid 
    stateDiagram-v2
      state fork_state <<fork>>
        [*] --> fork_state
        fork_state --> State2
        fork_state --> State3

        state join_state <<join>>
        State2 --> join_state
        State3 --> join_state
        join_state --> State4
        State4 --> [*]
    ```

``` mermaid
stateDiagram-v2
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3

    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]
```

### Using class diagrams

Class diagrams are central to object oriented programing, describing the structure of a system by modelling entities as classes and relationships between them:


    ``` mermaid
    classDiagram
      Person <|-- Student
      Person <|-- Professor
      Person : +String name
      Person : +String phoneNumber
      Person : +String emailAddress
      Person: +purchaseParkingPass()
      Address "1" <-- "0..1" Person:lives at
      class Student{
        +int studentNumber
        +int averageMark
        +isEligibleToEnrol()
        +getSeminarsTaken()
      }
      class Professor{
        +int salary
      }
      class Address{
        +String street
        +String city
        +String state
        +int postalCode
        +String country
        -validate()
        +outputAsLabel()  
      }
    ```

``` mermaid
classDiagram
  Person <|-- Student
  Person <|-- Professor
  Person : +String name
  Person : +String phoneNumber
  Person : +String emailAddress
  Person: +purchaseParkingPass()
  Address "1" <-- "0..1" Person:lives at
  class Student{
    +int studentNumber
    +int averageMark
    +isEligibleToEnrol()
    +getSeminarsTaken()
  }
  class Professor{
    +int salary
  }
  class Address{
    +String street
    +String city
    +String state
    +int postalCode
    +String country
    -validate()
    +outputAsLabel()  
  }
```