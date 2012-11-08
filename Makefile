MOCHA_OPTS=
REPORTER = spec

check: test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--require should \
			--reporter $(REPORTER) \
			$(MOCHA_OPTS)

.PHONY: test