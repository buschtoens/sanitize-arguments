MOCHA_OPTS=
REPORTER = dot

check: test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
			--require should \
			--reporter $(REPORTER) \
			$(MOCHA_OPTS)

.PHONY: test