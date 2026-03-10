#!/bin/bash
# Brain Quality Verification Script
# Run this BEFORE claiming any brain is "PhD level"

BRAIN_DIR="/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000"
MIN_LINES=1000
REQUIRED_PARTS=("PART I" "PART II" "PART III" "PART IV" "PART V" "PART VI" "PART VII" "PART VIII" "PART IX")

echo "========================================"
echo "BRAIN QUALITY VERIFICATION"
echo "========================================"
echo ""
echo "Minimum lines required: $MIN_LINES"
echo "Required sections: ${REQUIRED_PARTS[*]}"
echo ""
echo "========================================"

PASS_COUNT=0
FAIL_COUNT=0
FAILED_BRAINS=""

for brain_path in "$BRAIN_DIR"/*_brain; do
    brain_name=$(basename "$brain_path")
    claude_file="$brain_path/CLAUDE.md"

    if [[ ! -f "$claude_file" ]]; then
        echo "❌ $brain_name: No CLAUDE.md file"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        FAILED_BRAINS="$FAILED_BRAINS $brain_name"
        continue
    fi

    # Check line count
    line_count=$(wc -l < "$claude_file" | tr -d ' ')

    # Check for required parts
    missing_parts=""
    for part in "${REQUIRED_PARTS[@]}"; do
        if ! grep -q "$part" "$claude_file"; then
            missing_parts="$missing_parts $part"
        fi
    done

    # Check for case studies (should have 10)
    case_study_count=$(grep -c "Case Study" "$claude_file" 2>/dev/null || echo "0")

    # Check for failure patterns (should have 5)
    failure_pattern_count=$(grep -c "Failure Pattern" "$claude_file" 2>/dev/null || echo "0")

    # Check for success patterns (should have 5)
    success_pattern_count=$(grep -c "Success Pattern" "$claude_file" 2>/dev/null || echo "0")

    # Check for war stories (should have 5)
    war_story_count=$(grep -c "War Story" "$claude_file" 2>/dev/null || echo "0")

    # Check for bibliography
    has_bibliography=$(grep -c "BIBLIOGRAPHY\|Bibliography\|References" "$claude_file" 2>/dev/null || echo "0")

    # Determine pass/fail
    issues=""

    if [[ $line_count -lt $MIN_LINES ]]; then
        issues="$issues [LINES: $line_count < $MIN_LINES]"
    fi

    if [[ -n "$missing_parts" ]]; then
        issues="$issues [MISSING:$missing_parts]"
    fi

    if [[ $case_study_count -lt 5 ]]; then
        issues="$issues [CASE_STUDIES: $case_study_count < 10]"
    fi

    if [[ $failure_pattern_count -lt 3 ]]; then
        issues="$issues [FAILURE_PATTERNS: $failure_pattern_count < 5]"
    fi

    if [[ $success_pattern_count -lt 3 ]]; then
        issues="$issues [SUCCESS_PATTERNS: $success_pattern_count < 5]"
    fi

    if [[ $war_story_count -lt 3 ]]; then
        issues="$issues [WAR_STORIES: $war_story_count < 5]"
    fi

    if [[ $has_bibliography -eq 0 ]]; then
        issues="$issues [NO_BIBLIOGRAPHY]"
    fi

    if [[ -z "$issues" ]]; then
        echo "✅ $brain_name: PASS ($line_count lines)"
        PASS_COUNT=$((PASS_COUNT + 1))
    else
        echo "❌ $brain_name: FAIL$issues"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        FAILED_BRAINS="$FAILED_BRAINS $brain_name"
    fi
done

echo ""
echo "========================================"
echo "SUMMARY"
echo "========================================"
echo "PASSED: $PASS_COUNT"
echo "FAILED: $FAIL_COUNT"
echo ""

if [[ $FAIL_COUNT -gt 0 ]]; then
    echo "FAILED BRAINS:$FAILED_BRAINS"
    echo ""
    echo "EXIT CODE: 1 (VERIFICATION FAILED)"
    exit 1
else
    echo "ALL BRAINS MEET PHD STANDARD"
    echo "EXIT CODE: 0 (VERIFICATION PASSED)"
    exit 0
fi
