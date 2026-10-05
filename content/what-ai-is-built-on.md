# What AI Is Built On

An AI response appears on a screen. Producing it requires a system that extends from software and trained models to processors, networks and electricity supply.

The first TeraFrontier essay examined how deliverable power is shaping data center development in APAC. To understand why that constraint matters, it helps to place it within the wider system. What does a GPU actually do? How does a building full of computing equipment become a service? And what must an application add before that service becomes useful?

Type a question into an AI chat application and press send. The application passes your request to a model running on computing equipment, then displays the response. Following that familiar interaction through the underlying layers helps explain how chips, power and software become a service people can use.

## From silicon to processors

The physical starting point is semiconductor manufacturing. Silicon is purified and formed into wafers on which circuits are built through repeated manufacturing steps. Lithography helps define the patterns used to create those circuits. A finished wafer contains many individual chips, which must be separated, tested and incorporated into packages. [^1]

Design determines what the processor is built to do. Fabrication produces the circuits. Packaging provides the connections needed to use them and can bring processors and memory close together in a single assembly. TSMC’s advanced packaging services illustrate why packaging has become a substantial part of system design, rather than simply a protective case around a chip. [^2]

For AI, the GPU, or graphics processing unit, is particularly important. Many neural-network calculations involve repeatedly multiplying and adding arrays of numbers. GPUs can carry out large amounts of this work in parallel. Their suitability comes from matching the structure of the calculation to the structure of the processor. [^3]

The CPU, or central processing unit, remains part of the system. It runs general software, coordinates tasks and supports the work assigned to accelerators such as GPUs. Memory holds the model parameters and working data needed during calculation. Storage retains files and datasets beyond the immediate operation. These components perform different jobs; a faster GPU does not remove the need for the others. [^3] [^4]

Memory has two distinct characteristics. Capacity determines how much it can hold. Bandwidth determines how quickly data can move. A processor can have substantial calculating power and still spend time waiting for data. That is one reason a chip’s headline performance is an incomplete guide to the speed of an AI workload. [^3]

## From processors to a computing system

A server brings processors, memory, storage and networking together. Servers are installed in racks, and connected groups of machines can operate as clusters. The scale depends on the workload: some models can run on a single device, while larger training jobs or services may require many GPUs or other specialised processors working together.

NVIDIA’s January 2026 announcement offers a concrete example of a large integrated design. Its Vera Rubin NVL72 system combines 72 GPUs and 36 CPUs with communication components in a rack-scale platform. Those numbers describe an announced manufacturer design, not a typical rack or a count of systems already operating. They show how much equipment is needed around the GPUs themselves. [^5]

Using multiple GPUs requires dividing the work. One approach splits a model across devices. Another has devices work on different batches of data and exchange the information needed to update the model. The choice depends on the model, available memory and the task. Communication becomes part of the calculation, rather than something that happens only before or after it.

Connections inside a server, between servers and across racks therefore matter. NVIDIA’s documentation for its Grace-Blackwell systems distinguishes communication within a tightly connected GPU group from networking across the wider cluster. The equipment is designed as a coordinated system. [^4]

This explains why adding processors does not guarantee a proportional increase in useful output. If devices are waiting for one another, or the software cannot keep them occupied, some of the installed capacity is underused. The practical question is how much work the whole system can complete under the conditions in which it will operate.

:::figure 1

## Keeping the equipment operating

A computing system needs a facility that can supply electricity, remove heat and sustain service through maintenance and equipment failures. Power must reach the site and then be distributed at the conditions required by the equipment. Cooling must carry heat away from the processors and ultimately reject it outside the building. [^13]

In a conventional air-cooled server, fans move air across the components. Facility cooling equipment then removes heat from that air. Outside the building, an evaporative system, such as a cooling tower, rejects heat by evaporating some water, which must be replenished. A dry system transfers heat to outdoor air without deliberately evaporating water. It may still circulate water or another fluid in a closed loop; “dry” describes how heat leaves the facility. [^13]

Weather affects the choice. Cool outdoor conditions can reduce the need for compressor-based refrigeration. Hot conditions make dry heat rejection harder, while high humidity limits how far evaporation can lower temperature. Depending on the required cooling temperature, a site may need refrigeration, a hybrid arrangement or different operating modes across the year. Water availability also matters. [^13]

Direct liquid cooling changes how heat is collected at the server: coolant passes close to hot components rather than relying only on airflow. That heat must still leave the building through the facility’s cooling system. NVIDIA’s 2026 account of warm-water cooling illustrates how higher coolant temperatures can enable dry heat rejection in favourable climates. Liquid cooling at the chip therefore does not, by itself, establish whether a facility consumes water through evaporation. [^6]

The distinction between power and energy is useful here. Power, measured in megawatts, describes a rate of electricity use or available electrical capacity. Energy, measured in megawatt-hours, describes consumption over time. Neither figure is interchangeable with the amount of computing work delivered. Whole-facility consumption also includes cooling and electrical-system overheads, beyond the computing equipment itself. [^13]

The IEA’s 2026 outlook puts global data center electricity consumption at 485 terawatt-hours in 2025 and projects 950 terawatt-hours in 2030. The first figure is an estimate for a past year; the second is a central projection. Both include non-AI data center workloads. They indicate the scale of the supporting electricity system, not the energy cost of an individual AI answer. [^7]

For a specific project, the decisive issue may be readiness. A completed server installation cannot serve customers at its planned scale if the required electrical supply or cooling is unavailable. This is where Article 01’s focus on deliverable power enters the wider stack. A connection date matters because it can determine when installed equipment becomes usable capacity.

## Making computing capacity accessible

Software turns that equipment into something people can use. Operating systems and drivers manage hardware. Other software allocates resources, schedules jobs and runs model calculations. Serving software handles incoming requests and returns outputs. These functions are part of the system even when the user never sees them.

Cloud services provide ways to access this capacity without owning the underlying facility. At one level, a customer rents computing resources and manages much of the software. AWS’s EC2 documentation, for example, describes instances offering different combinations of processor, memory, storage and networking capacity. [^8]

At another level, a developer sends a request to a managed model service through an application programming interface, or API. The API defines how software requests a service and receives its response. The developer can build an application around model outputs while the provider operates the model-serving infrastructure. AWS’s documentation for managed inference endpoints illustrates this division of responsibilities. [^9]

The distinction is the level of service being purchased. Renting computing resources leaves more of the model operation with the customer. Calling a managed model service places more of that responsibility with the provider. Both arrangements ultimately depend on physical equipment somewhere.

Cloud is therefore a way of organizing access and responsibility, not a mandatory step between hardware and AI. An organization can also operate its own systems, and some models run locally on personal devices.

## From a model to a useful application

A model is a mathematical structure with parameters learned from data. In a neural network, those parameters help determine how inputs are transformed into outputs. The model’s architecture defines the structure of the calculations; training adjusts its parameters. Hardware executes the calculations, but hardware alone does not supply the learned capability. [^10]

Training and inference are different activities. Training uses examples and an objective to update model parameters. Inference applies the resulting model to new inputs. For a language model, text is represented as tokens, which can be words, parts of words or other units. A text-generating model uses the available context to generate further tokens. [^10] [^11]

:::table 1

Return to the chat application in the introduction. The language model processes the question and generates a response. The application around it manages the conversation, controls access and displays the result. Calling the product an AI assistant describes its role for the user; the application includes more than the model itself.

Some questions need information beyond what the model learned during training. One approach is retrieval-augmented generation, or RAG. The software searches a document collection for relevant passages and includes them with the request to the model. This supplies context without, by itself, retraining the model. AWS’s Knowledge Bases documentation describes this retrieval process and the inclusion of references in responses. [^12]

If the question requires a calculation, the application could invoke a separate calculation tool. The surrounding software controls which tools can run and with what permissions. An agent is a further design choice in which a model helps select and sequence actions towards a goal. A straightforward question-and-answer interaction does not require one. [^14]

The user still needs to assess the result. A fluent answer can contain errors, and supplying relevant documents does not guarantee correct interpretation. References make checking easier; they do not replace it. A useful application should make it easier to inspect the evidence behind an answer. [^11] [^12]

This is also where the system meets a commercial test. A customer may pay for a subscription, usage or an integrated workflow. The benefit has to justify the cost and effort of using it. The relevant question is whether the application helps the user complete a task reliably and efficiently. The presence of an AI model alone does not establish that outcome.

Applications can also help build other applications. Codex and Claude Code are coding agents that combine models with software tools to help users create and modify code. Their tools, working context and controls are part of the product around the model. Helping build software does not move them out of the application layer. [^15] [^16]

This raises a further question: will users still need to interact with individual applications? An assistant could become the main interface for more tasks, calling other software on the user’s behalf. The application layer might become less visible, while functions such as access control, data storage and execution remain necessary. That is a possible direction, not evidence that applications will disappear.

The commercial question is what customers should pay for: access to software, usage measured in tokens, or a verified result. These arrangements could coexist. A service could charge for completed work while paying its model provider for token usage. But an outcome-based contract needs an agreed definition of success, a way to verify it and a decision about who pays for failed attempts. The cost of producing an answer and the value of completing a task are different measures.

## Different layers create different constraints

The stack is useful as a map, but its constraints need to be separated. A memory limit can slow a running model. A network limit can reduce the efficiency of a cluster. A delayed grid connection can prevent a facility from opening at its planned capacity. These problems occur at different points and require different solutions.

Current evidence does not support the simple conclusion that chips are no longer a constraint and power has replaced them. The IEA’s 2026 assessment describes tighter constraints in both energy supply chains and advanced chip manufacturing, including high-bandwidth memory. That is evidence of several pressures occurring together, rather than a universal ranking of which one matters most. [^7]

Efficiency also changes the relationship between AI use and infrastructure demand. Better hardware and software can reduce the resources required for a given task. At the same time, broader adoption and more demanding applications can increase total consumption. The IEA identifies these competing trends as central uncertainties in the outlook. User growth alone is therefore insufficient to calculate future electricity demand. [^7]

For an infrastructure decision, the useful question is specific: what prevents this workload from being served, at this site, on the required schedule? Securing additional GPUs may help one project. Another may need an earlier connection, a cooling redesign or software that makes better use of the equipment already installed.

Understanding these dependencies gives the power question its proper place. Electricity is essential, and its delivery can determine when capacity becomes available. The value of that capacity still depends on the equipment, software, model and application working together to perform a useful task. The development plan needs to connect those requirements to the same operating date.
