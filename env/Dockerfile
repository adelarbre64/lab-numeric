# syntax=docker/dockerfile:1

############################################################
# lab-numeric — Environnement Linux de l'apprenti agent
# Contient : users root/agent, la note cryptée, la commande
# personnalisée "decrypt-note" et ses logs.
# Doit être lancé en interactif : docker run -it …
############################################################

FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    TERM=xterm-256color

# Utilisateurs : root (existant) + agent
RUN useradd --create-home --shell /bin/bash --uid 1001 agent

# Arborescence de mission
RUN mkdir -p /srv/datas /var/log/decrypt

# --- La note cryptée (propriété root, lecture root uniquement) ---
COPY assets/srv/datas/note_1773.dat /srv/datas/note_1773.dat
RUN chown root:root /srv/datas/note_1773.dat && chmod 600 /srv/datas/note_1773.dat

# --- Commande personnalisée decrypt-note ---
COPY assets/usr/local/bin/decrypt-note /usr/local/bin/decrypt-note
RUN chmod 755 /usr/local/bin/decrypt-note

# --- Journal de décryptage (propriété root, lecture root uniquement) ---
COPY assets/var/log/decrypt/note.log /var/log/decrypt/note.log
RUN chown root:root /var/log/decrypt/note.log && chmod 600 /var/log/decrypt/note.log

# --- Bannières : accueil root (code d'activation) et agent ---
COPY assets/root/.bashrc /root/.bashrc
COPY assets/home/agent/.profile /home/agent/.profile
RUN chown agent:agent /home/agent/.profile

# Interactive obligatoire : pas de service réseau exposé
WORKDIR /root

ENTRYPOINT ["/bin/bash"]
