
# Makefile - TrailRacer UI (Angular)
# Place this file in the root of your project

.PHONY: help install start build test test-ci lint i18n clean format analyze

SHELL := /bin/sh

help:
	@echo "TrailRacer UI - Make targets"
	@echo "  make install   - Install node modules (npm ci)"
	@echo "  make start     - Start Angular dev server with proxy (http://localhost:4200)"
	@echo "  make build     - Production build"
	@echo "  make test      - Run unit tests (Jest)"
	@echo "  make test-ci   - Run CI tests with coverage"
	@echo "  make lint      - Run linter (if configured)"
	@echo "  make i18n      - Extract i18n messages"
	@echo "  make clean     - Remove dist (and show tip for full reset)"
	@echo "  make format    - Format sources with prettier (if available)"
	@echo "  make analyze   - Print Angular/Node versions"

# Install dependencies exactly from package-lock.json
install:
	npm ci

# Start dev server with proxy.conf.js
start:
	npx ng serve --proxy-config proxy.conf.js --configuration development

# Production build
build:
	npx ng build --configuration production

# Run unit tests once (no watch)
test:
	npx jest

test-ci:
	npx jest --coverage --passWithNoTests

# Lint the project (requires lint config in angular.json)
lint:
	npx ng lint || true

# Extract i18n source messages (uses configuration from angular.json)
i18n:
	npx ng extract-i18n || true

# Remove build artifacts (and optionally node_modules)
clean:
	rm -rf dist
	@echo "Tip: remove node_modules with 'rm -rf node_modules' if you need a full reset"

# Format code with prettier if present
format:
	npx prettier --write "src/**/*.{ts,html,scss,css,json,md}" || true

# Show Angular/Node versions
analyze:
	node -v
	npx ng version
