<template>
    <div class="static-page">
        <div class="container">
            <div class="content-wrapper">
                <h1 class="page-title">Safety at NestAsia</h1>
                <p class="lead">Your safety is our top priority. We're committed to creating a secure and trusted
                    community for everyone.</p>

                <section class="info-section">
                    <div class="icon-header">
                        <span class="icon">🛡️</span>
                        <h2>Verified Listings</h2>
                    </div>
                    <p>
                        Every listing on NestAsia goes through a verification process. We check host identities and
                        property details
                        to ensure that what you see is what you get.
                    </p>
                </section>

                <section class="info-section">
                    <div class="icon-header">
                        <span class="icon">🔒</span>
                        <h2>Secure Payments</h2>
                    </div>
                    <p>
                        Never transfer money outside of the NestAsia platform. Our secure payment system protects your
                        money until
                        you check in. If a host asks you to pay off-site, report it immediately.
                    </p>
                </section>

                <section class="info-section">
                    <div class="icon-header">
                        <span class="icon">📞</span>
                        <h2>24/7 Support</h2>
                    </div>
                    <p>
                        Our dedicated safety team is available 24/7 to assist you. If you ever feel unsafe, contact
                        local emergency
                        services immediately and then reach out to us.
                    </p>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>
.static-page {
    padding: 4rem 0;
    background: var(--color-gray-50);
    min-height: 80vh;
}

.content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 3rem;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
}

.page-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-gray-900);
}

.lead {
    font-size: 1.25rem;
    color: var(--color-gray-600);
    margin-bottom: 3rem;
    line-height: 1.6;
}

.info-section {
    margin-bottom: 2.5rem;
}

.icon-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.icon {
    font-size: 1.5rem;
}

h2 {
    font-size: 1.5rem;
    color: var(--color-gray-800);
    margin: 0;
}

p {
    line-height: 1.7;
    color: var(--color-gray-700);
}
</style>
