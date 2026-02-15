<template>
    <div class="static-page">
        <div class="container">
            <div class="content-wrapper">
                <h1 class="page-title">Cancellation Policies</h1>
                <p class="lead">Understand your options if plans change. Hosts choose one of the following policies for
                    their listings.</p>

                <div class="policy-card">
                    <div class="policy-header">
                        <h3>Flexible</h3>
                        <span class="badge badge-green">Most Popular</span>
                    </div>
                    <p>Full refund for cancellations made within 24 hours of booking. Afterward, full refund up to 24
                        hours before check-in.</p>
                </div>

                <div class="policy-card">
                    <div class="policy-header">
                        <h3>Moderate</h3>
                    </div>
                    <p>Full refund for cancellations made within 48 hours of booking. Afterward, full refund up to 5
                        days before check-in.</p>
                </div>

                <div class="policy-card">
                    <div class="policy-header">
                        <h3>Strict</h3>
                    </div>
                    <p>Full refund for cancellations made within 48 hours of booking and at least 14 days before
                        check-in. Afterward, 50% refund up to 7 days before check-in.</p>
                </div>

                <section class="note-section">
                    <h4>Extenuating Circumstances</h4>
                    <p>
                        In rare cases, such as natural disasters or serious illness, we may override the host's
                        cancellation policy.
                        <router-link to="/help">Learn more</router-link>
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

.policy-card {
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background: var(--color-gray-50);
}

.policy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.policy-header h3 {
    margin: 0;
    font-size: 1.25rem;
}

.badge-green {
    background: #d1fae5;
    color: #065f46;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}

.note-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-gray-200);
}

.note-section h4 {
    margin-bottom: 0.5rem;
}

.note-section a {
    color: var(--color-primary-600);
    text-decoration: none;
    font-weight: 500;
}
</style>
