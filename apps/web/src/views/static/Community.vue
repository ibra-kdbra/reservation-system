<template>
    <div class="static-page">
        <div class="container text-center">
            <h1 class="page-title">Community Forum</h1>
            <p class="lead">Connect with other travelers and hosts. Share stories, tips, and advice.</p>

            <div class="forum-preview">
                <div class="forum-topic" @click="activeTopic = 1">
                    <span class="tag">Travel Tips</span>
                    <h3>Best time to visit Kyoto?</h3>
                    <p>Started by <strong>SakuraFan</strong> · 24 replies</p>
                </div>
                <div class="forum-topic" @click="activeTopic = 2">
                    <span class="tag">Hosting</span>
                    <h3>How to welcome guests during festivals</h3>
                    <p>Started by <strong>HostHiro</strong> · 12 replies</p>
                </div>
                <div class="forum-topic" @click="activeTopic = 3">
                    <span class="tag">Hidden Gems</span>
                    <h3>Secret spots in Bali</h3>
                    <p>Started by <strong>BeachBum</strong> · 56 replies</p>
                </div>
            </div>

            <div v-if="activeTopic" class="topic-modal-overlay" @click.self="activeTopic = null">
                <div class="topic-modal">
                    <button class="close-btn" @click="activeTopic = null">×</button>
                    <div v-if="activeTopic === 1">
                        <span class="tag">Travel Tips</span>
                        <h2>Best time to visit Kyoto?</h2>
                        <div class="post">
                            <div class="post-meta"><strong>SakuraFan</strong> · 2 days ago</div>
                            <p>Hi everyone! I'm planning a trip to Kyoto next year. I really want to see the cherry
                                blossoms but I hear it gets very crowded. Is strictly in April the best time, or is late
                                March also good?</p>
                        </div>
                        <div class="reply">
                            <div class="post-meta"><strong>KyotoLocal</strong> · 1 day ago</div>
                            <p>Late March is often great! It depends on the weather that year. If you want to avoid
                                crowds, try visiting some of the smaller temples in Northern Kyoto.</p>
                        </div>
                    </div>
                    <div v-if="activeTopic === 2">
                        <span class="tag">Hosting</span>
                        <h2>How to welcome guests during festivals</h2>
                        <div class="post">
                            <div class="post-meta"><strong>HostHiro</strong> · 5 days ago</div>
                            <p>The Gion Matsuri is coming up and I have guests staying. I want to leave them a small
                                festival-related gift. Any ideas?</p>
                        </div>
                        <div class="reply">
                            <div class="post-meta"><strong>SuperHostSarah</strong> · 4 days ago</div>
                            <p>A folding folding fan (sensu) is a lovely, practical gift! Also maybe a printed schedule
                                of the parade route.</p>
                        </div>
                    </div>
                    <div v-if="activeTopic === 3">
                        <span class="tag">Hidden Gems</span>
                        <h2>Secret spots in Bali</h2>
                        <div class="post">
                            <div class="post-meta"><strong>BeachBum</strong> · 1 week ago</div>
                            <p>I'm looking for beaches that aren't packed with tourists. I'm staying near Uluwatu.
                                Thanks!</p>
                        </div>
                    </div>
                    <div class="reply-box">
                        <input type="text" placeholder="Write a reply..." class="reply-input" />
                        <button class="btn btn-primary btn-sm">Post</button>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary btn-lg mt-8" @click="activeTopic = 1">Join the Discussion</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeTopic = ref<number | null>(null)
</script>

<style scoped>
.static-page {
    padding: 4rem 0;
    background: var(--color-gray-50);
    min-height: 80vh;
}

.text-center {
    text-align: center;
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
}

.forum-preview {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
}

.forum-topic {
    background: white;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    margin-bottom: 1rem;
    border: 1px solid var(--color-gray-200);
    transition: transform 0.2s;
    cursor: pointer;
}

.forum-topic:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.tag {
    background: var(--color-primary-100);
    color: var(--color-primary-700);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.forum-topic h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
}

.forum-topic p {
    margin: 0;
    color: var(--color-gray-500);
    font-size: 0.875rem;
}


.mt-8 {
    margin-top: 2rem;
}

.topic-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    text-align: left;
}

.topic-modal {
    background: white;
    padding: 2rem;
    border-radius: var(--radius-lg);
    max-width: 600px;
    width: 100%;
    position: relative;
    max-height: 80vh;
    overflow-y: auto;
}

.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-gray-500);
}

.topic-modal h2 {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: var(--color-gray-900);
}

.post,
.reply {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-gray-100);
}

.reply {
    margin-left: 2rem;
    border-left: 3px solid var(--color-gray-200);
    padding-left: 1rem;
    border-bottom: none;
}

.post-meta {
    font-size: 0.875rem;
    color: var(--color-gray-500);
    margin-bottom: 0.5rem;
}

.post p,
.reply p {
    line-height: 1.6;
    color: var(--color-gray-800);
    margin: 0;
}

.reply-box {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
}

.reply-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
}

.btn-sm {
    padding: 8px 16px;
    font-size: 0.875rem;
}
</style>
