# AI Infrastructure in APAC: The Race for Deliverable Power

Demand is there. The harder question is how quickly the infrastructure can be delivered to serve it.

Across Asia-Pacific, power is becoming a deciding factor in where data centers can grow, when they can come online and what companies must commit to make them viable. Land, fiber, water and proximity to customers still matter. But a location that works on all those measures may still be unusable within the customer’s timeline if electricity cannot reach it.

Power has always mattered to data centers. What changes in a constrained market is the development decision. Hyperscalers and colocation providers may have to move beyond their preferred locations, help fund grid upgrades or arrange dedicated generation. Each route changes the project’s cost, risks and ability to serve different customers.

My view is that the next stage of AI infrastructure development in APAC will increasingly depend on managing these choices. Securing megawatts is part of the job. Turning them into reliable, operating compute on a credible schedule is what creates value.

## Demand is running ahead of capacity

The scale of electricity demand is already changing. The International Energy Agency reports that global data center electricity demand grew by 17% in 2025, while demand from AI-focused data centers grew by 50%. [^1]

Public company disclosures show the commercial pressure behind that growth. In its 2025 shareholder letter, Amazon reported that AWS added 3.9 GW of power capacity during the year and was monetizing capacity as quickly as it was installed. It also reported unserved demand because of capacity constraints. [^2]

These global figures cover both AI and broader cloud demand. Conditions vary across APAC, but where customers are waiting for capacity, the pressure to deliver is immediate.

Where customers are waiting and the rest of the facility is ready, bringing power forward can bring revenue forward. It can also help secure customers who might otherwise choose a competitor with capacity available sooner. A lower electricity price several years from now may be less attractive than a workable supply available sooner.

That does not make every expensive power solution a good investment. It means the cost of waiting belongs in the comparison.

## Power is changing the location decision

Expanding around an established location has advantages. Customers, networks, suppliers and operating teams may already be there. Moving farther away can mean rebuilding some of those advantages.

The difficulty is that electricity infrastructure runs on a different timetable. The IEA estimates that planning, permitting and completing new grid infrastructure can take 5–15 years, compared with 1–3 years for data centers. Those are broad development timelines, not a forecast for every connection, but the mismatch matters when a project depends on major network works. [^3]

Policy is also changing where and under what conditions growth can happen.

In South Korea, the Special Act on the Promotion of Distributed Energy introduced power-system impact assessments for large electricity users. The assessment considers both grid capacity and the project’s wider local impact, and is intended to steer large electricity users outside the Seoul metropolitan area. For a project seeking to remain near Seoul, securing land does not establish that electricity supply will be approved. Some metropolitan projects have passed assessment, so the framework should not be described as a blanket ban. [^4]

Thailand is revising how it screens and supplies data center projects. In August 2026, the government described stronger screening based on economic benefits, power and water availability, and environmental impacts. It also reported approval of a separate electricity-user category for data centers so tariffs could reflect the cost of serving them, alongside financial guarantees for electricity applications. Detailed screening and location criteria were still being developed. [^5]

Malaysia is becoming more selective too. In February 2026, the prime minister said the country had restricted new data center investments unrelated to AI because of rising power and water consumption. MIDA subsequently described a task-force process that approves projects with secured power and water and demonstrated environmental compliance. [^6] [^7]

Across these markets, governments are taking a more active role in deciding which projects infrastructure can support, where they should go and how their costs should be covered.

For companies planning new capacity, those decisions belong near the beginning of site selection.

## Customers determine how far compute can move

Moving toward available power sounds straightforward. Whether it works depends on what the customer needs the facility to do.

AI training is the process of building or improving a model. Inference is using that model to produce an answer, prediction or action. Their location requirements can differ, and inference itself includes applications with very different response-time needs.

The IEA identifies training and some types of inference as less sensitive to latency than traditional workloads, giving them more location flexibility. Connectivity and data-sovereignty requirements still constrain the choice. [^8]

Latency is the delay in communication between systems. It matters both between a user and an application and between facilities that need to exchange or synchronize data. AWS, for example, describes its Availability Zones as sufficiently close to support synchronous replication with single-digit millisecond latency. This illustrates the networking requirements of interconnected facilities, rather than a universal limit for data center locations. [^9]

Training may allow an entire cluster to sit farther from end users. The machines within that cluster still need fast, high-capacity connections to one another. Freedom to move the cluster does not mean the equipment can be spread anywhere.

There is also a longer-term investment question: what else should the facility be able to support?

This is workload fungibility: how readily capacity can serve different workloads or customers. A location suited to training may offer fewer options for latency-sensitive inference or other cloud services. Location, connectivity and facility design all affect that flexibility.

Flexibility can also involve when work runs. In March 2026, Google reported incorporating 1 GW of demand-response capacity into long-term contracts with US utilities. The arrangements allow it to limit or shift some machine-learning workloads during periods of grid pressure and can support faster connections. The figure describes contracted flexibility, rather than proof that 1 GW had already been curtailed. [^10]

The lesson for APAC is to start with the workload. How far it can move, when it must run and what other uses the facility should support will shape the power options worth pursuing.

## Three routes to earlier power

Companies developing data centers in a constrained location have three broad routes. They can combine them, and the best answer will vary by market and project.

### Work with the utility and grid operator

Early utility engagement can reveal whether the constraint sits in the connection process, a local substation or the wider network. Those problems require different solutions.

Malaysia’s TNB offers an example of improving the delivery process. In a 2026 update, it reported that its Green Lane Pathway had reduced data center connection timelines from 36 months to as little as 12 months, with 33 projects delivered under the framework as of March. These are electricity-connection figures, not full data center commissioning timelines, and 12 months is not a guarantee for every project. [^11]

In Australia, Transgrid announced proposed network upgrades in August 2026 that could support up to 2 GW of additional data center demand in Sydney. Its approach requires participating data center companies to fund infrastructure, including works beyond their own connection, with capacity allocated against signed agreements and funding commitments. The upgrades remain proposed, but the commercial implication is clear: securing additional grid capacity can require the companies seeking that capacity to help finance its delivery. [^12]

These examples show two ways to work with utilities: improve the connection process and help fund the infrastructure needed to serve new demand. A project may need both.

### Move toward available capacity

Another location may offer earlier access to power, lower electricity costs, or both.

The comparison needs to cover the whole site. Fiber routes, customer latency requirements, water, land approvals and construction readiness may offset the power advantage. A location with electricity available sooner is useful only if the facility can be completed and serve the intended workload sooner.

For a flexible training workload, moving farther away may make sense. For a facility serving customers tied to an existing metro, paying more to remain nearby may be justified.

### Arrange dedicated generation

Dedicated generation provides another way to address timing, cost and control over supply.

Some technologies can be deployed quickly under the right conditions. Bloom Energy reported that it delivered a fully operational fuel-cell system to Oracle in 55 days in 2025. That is a supplier-reported system deployment, not the development timeline for an entire data center, but it helps explain the interest in modular power solutions. [^13]

The project team still needs to establish fuel availability, equipment delivery, permitting and maintenance. Power reliability and redundancy are central to the design. The facility must remain supplied during planned maintenance and unexpected outages, using an appropriate combination of spare generation, backup systems, storage or grid support.

Those arrangements affect the cost and schedule. The solution also needs to fit the operator’s emissions commitments.

The comparison therefore needs to include the complete power system and its operating obligations. A generator’s headline electricity cost or delivery date is only part of the answer.

## Does the solution deliver the time it promises?

The commercial question is whether a power solution allows the project to begin serving customers earlier, at a cost and risk the investment can support.

Consider a hypothetical project with a grid connection expected in four years and dedicated generation proposed in two. Paying a premium for generation could be worthwhile if it enables two additional years of revenue and secures a customer who cannot wait for the grid connection.

But the two-year schedule may depend on permits, equipment, fuel infrastructure and financing. If one of those slips, the company can end up paying for land, a building and equipment while waiting for the power needed to earn revenue.

Construction deserves the same scrutiny. The team should test whether phased delivery or overlapping activities could bring the first usable capacity online sooner. Accelerating the building helps only if power, cooling, connectivity and commissioning are ready for that first phase.

Compare what sits behind each proposed date: whether permits are issued, equipment delivery slots are secured, fuel infrastructure is funded and the connection works have an agreed schedule. Then identify which unfinished step could delay first revenue, who controls it and what the fallback would be.

The duration of the commitment matters too. A power premium paid for two years has different economics from a premium locked in for twenty. Minimum payments, termination costs and obligations for fuel or network infrastructure can outlast the original reason for choosing the solution.

That is especially important for bridge power intended to operate until a grid connection arrives. The plan should explain what happens afterward: whether equipment can be redeployed, retained for backup or retired, and which contractual costs remain.

Companies will rarely have complete certainty before committing. A useful discipline is to tie larger commitments to evidence that the schedule is becoming achievable. For example, a team might reserve equipment before every approval is complete, while making further spending conditional on a key permit or a firm fuel-supply agreement. The cost of preserving that option belongs alongside the cost of waiting.

## What makes a project credible?

APAC’s markets will continue to respond differently. Some will improve connection processes. Others will ask developers to fund upgrades, steer demand toward different locations or place tighter conditions on approvals.

The investment case should explain when the first customer can be served, what must happen before that date and what remains payable if the schedule slips. It should also show whether the location can support other workloads and how the power arrangement changes once a grid connection becomes available.

My view is that this coordination will increasingly separate projects that announce capacity from those that deliver it. A hyperscaler building its own campus and a colocation provider building for tenants face different commercial arrangements, but both need the customer commitment, site readiness and power supply to meet on the same schedule.

For APAC’s next wave of AI infrastructure, the advantage will belong to companies that can bring reliable capacity online while keeping the cost and obligations of getting there under control.
