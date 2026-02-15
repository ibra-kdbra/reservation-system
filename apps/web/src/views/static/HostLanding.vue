<template>
    <div class="host-landing">
        <!-- Hero -->
        <section class="host-hero">
            <div class="container hero-content">
                <h1>Earn money as a NestAsia Host</h1>
                <p>Turn your space into an income engine. Join thousands of hosts connecting travelers with authentic
                    Asian experiences.</p>
                <button class="btn btn-primary btn-lg">Get Started</button>
            </div>
        </section>

        <!-- Steps -->
        <section class="steps-section container">
            <h2 class="section-title">Hosting is easy</h2>
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-num">1</div>
                    <h3>List your space</h3>
                    <p>Share any space without sign-up charges, from a shared living room to a second home and
                        everything in-between.</p>
                </div>
                <div class="step-card">
                    <div class="step-num">2</div>
                    <h3>Decide how you host</h3>
                    <p>Choose your own schedule, prices, and requirements for guests. We're there to help along the way.
                    </p>
                </div>
                <div class="step-card">
                    <div class="step-num">3</div>
                    <h3>Welcome your first guest</h3>
                    <p>Once your listing is live, qualified guests can reach out. You can message them with any
                        questions before their stay.</p>
                </div>
            </div>
        </section>

        <!-- Support -->
        <section class="support-band">
            <div class="container">
                <h2>We've got your back</h2>
                <p>NestAsia provides 24/7 support, host protection insurance, and a community of experienced hosts to
                    guide you.</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
.host-landing {
    padding-bottom: 4rem;
}

.host-hero {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    height: 500px;
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    margin-bottom: 4rem;
}

.hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
}

.hero-content p {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.9;
}

.btn-lg {
    padding: 16px 48px;
    font-size: 1.25rem;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--color-gray-900);
}

.steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
}

.step-card {
    text-align: center;
}

.step-num {
    width: 48px;
    height: 48px;
    background: var(--color-primary-600);
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}

.step-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-gray-900);
}

.step-card p {
    color: var(--color-gray-600);
    line-height: 1.6;
}

.support-band {
    background: var(--color-gray-900);
    color: white;
    padding: 4rem 0;
    margin-top: 4rem;
    text-align: center;
}

.support-band h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.support-band p {
    color: var(--color-gray-400);
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.25rem;
}
</style>
