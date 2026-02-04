# Document Automation: Generation, OCR, Extraction, and Classification

## Overview

Document automation encompasses the automated creation, reading, understanding, and processing of documents. Organizations process thousands of documents daily -- invoices, contracts, forms, reports, correspondence -- and manual document handling is one of the largest sources of operational cost and error. This module covers document generation from templates and data, optical character recognition (OCR) for digitizing physical documents, intelligent data extraction from unstructured documents, and document classification for automated routing.

---

## 1. Document Generation

### 1.1 Template-Based Generation

The most common approach: merge structured data with document templates to produce finished documents.

**Template Engines**:
| Engine | Format | Best For |
|--------|--------|----------|
| Docx-templates | DOCX | Word document generation |
| Carbone | DOCX, XLSX, PDF, PPTX | Multi-format from single template |
| Handlebars/Mustache | HTML, text | Email templates, web documents |
| LaTeX | PDF | Technical documents, academic papers |
| React-PDF | PDF | Programmatic PDF generation |
| Puppeteer | PDF from HTML | Complex layouts, charts |

### 1.2 Template Design Principles

**Separation of Concerns**: Templates define layout and formatting. Data sources provide content. Never hardcode data in templates.

**Variable Naming**: Use descriptive, namespaced variables: `{{customer.name}}`, `{{order.total}}`, `{{company.address.city}}`.

**Conditional Content**: Templates should support conditional sections:
```
{{#if order.hasDiscount}}
  Discount Applied: {{order.discountPercentage}}%
{{/if}}
```

**Repeating Sections**: For line items, tables, and lists:
```
| Item | Quantity | Price |
{{#each order.items}}
| {{this.name}} | {{this.quantity}} | {{this.price}} |
{{/each}}
| **Total** | | **{{order.total}}** |
```

### 1.3 Generation Pipeline

```
Data Source (CRM, ERP, database)
    |
    v
[Data Retrieval and Transformation]
    |
    v
[Template Selection (based on document type)]
    |
    v
[Template Merge (inject data into template)]
    |
    v
[Post-Processing (add headers, page numbers, watermarks)]
    |
    v
[Output (save to storage, email, print)]
```

### 1.4 Batch Document Generation

For high-volume generation (monthly invoices, annual statements):
- Queue generation jobs for asynchronous processing
- Generate documents in parallel (one per worker)
- Store generated documents with metadata for retrieval
- Monitor generation success rate and alert on failures
- Implement checkpointing for large batches (resume from failure point)

---

## 2. OCR (Optical Character Recognition)

### 2.1 OCR Technology Landscape

| Technology | Accuracy | Speed | Best For |
|-----------|----------|-------|----------|
| Tesseract (open source) | Good (85-95%) | Fast | Printed text, simple layouts |
| Google Cloud Vision | Excellent (95-99%) | Fast | General-purpose OCR |
| AWS Textract | Excellent (95-99%) | Fast | Forms, tables, structured docs |
| Azure Form Recognizer | Excellent (95-99%) | Fast | Forms with pre-built models |
| ABBYY FineReader | Excellent (97-99%) | Medium | High-precision document processing |

### 2.2 OCR Pipeline

```
Document Input (scan, photo, PDF)
    |
    v
[Pre-Processing]
  - Deskew (correct rotation)
  - Denoise (remove artifacts)
  - Binarize (convert to black/white)
  - Enhance contrast
    |
    v
[OCR Engine]
  - Text detection (find text regions)
  - Character recognition (identify characters)
  - Post-processing (spell check, confidence scoring)
    |
    v
[Output]
  - Raw text with bounding boxes
  - Structured data (if form/table detection)
  - Confidence scores per character/word
```

### 2.3 OCR Quality Factors

| Factor | Impact | Mitigation |
|--------|--------|-----------|
| Image quality | Critical | Require minimum 300 DPI for scans |
| Rotation/skew | High | Apply deskew preprocessing |
| Noise/artifacts | High | Apply denoise preprocessing |
| Font type | Medium | Handwriting requires specialized models |
| Language | Medium | Use language-specific models |
| Layout complexity | High | Use layout-aware OCR (Textract, Form Recognizer) |

### 2.4 OCR Accuracy Measurement

| Metric | Description | Target |
|--------|-------------|--------|
| Character Accuracy | % of characters correctly recognized | > 98% |
| Word Accuracy | % of words correctly recognized | > 95% |
| Field Accuracy | % of form fields correctly extracted | > 90% |
| Table Accuracy | % of table cells correctly extracted | > 85% |

---

## 3. Intelligent Data Extraction

### 3.1 Rule-Based Extraction

Extract data using predefined patterns and rules:

**Regular Expressions**: For structured data with consistent formats:
- Invoice numbers: `/INV-\d{6}/`
- Dates: `/\d{2}\/\d{2}\/\d{4}/`
- Amounts: `/\$[\d,]+\.\d{2}/`

**Position-Based**: For documents with consistent layouts:
- "Total amount is always on line 15, position 45-60"
- Brittle to format changes but simple to implement

### 3.2 ML-Based Extraction

Train models to extract data from documents with varying formats:

**Named Entity Recognition (NER)**: Identify and classify entities (names, dates, amounts, addresses) in text regardless of position.

**Key-Value Extraction**: Identify key-value pairs in documents (e.g., "Invoice Date: March 15, 2024").

**Table Extraction**: Detect and extract tabular data from documents, mapping cells to rows and columns.

### 3.3 LLM-Based Extraction

Use large language models for flexible, high-accuracy extraction:

```
System: You are a document data extractor. Extract the following fields from the document text provided. Return the results as JSON.

Fields to extract:
- vendor_name: The company that issued the document
- invoice_number: The invoice or reference number
- invoice_date: The date of the invoice (YYYY-MM-DD format)
- total_amount: The total amount due (numeric, no currency symbol)
- line_items: Array of {description, quantity, unit_price, total}

Document text:
{ocr_output}
```

**Advantages**: Handles format variations gracefully, understands context, extracts from complex layouts.
**Limitations**: Higher per-document cost, latency, potential hallucination (must validate extracted data).

### 3.4 Extraction Validation

Always validate extracted data:
- Type checking (dates are valid dates, amounts are numeric)
- Range checking (amounts are within expected ranges)
- Cross-field validation (line item totals sum to invoice total)
- Confidence thresholds (route low-confidence extractions to human review)

---

## 4. Document Classification

### 4.1 Classification Approaches

| Approach | Accuracy | Setup Cost | Best For |
|----------|----------|-----------|----------|
| Rule-based (keywords) | Low-Medium | Low | Simple, well-defined categories |
| ML classifier (trained) | High | Medium | Consistent document types with training data |
| LLM zero-shot | Medium-High | Very Low | Diverse document types, rapid prototyping |
| LLM few-shot | High | Low | Good accuracy with minimal examples |

### 4.2 Classification Pipeline

```
Document Received
    |
    v
[Text Extraction (OCR if needed)]
    |
    v
[Classification Model]
    |
    +--> Invoice --> [Invoice Processing Pipeline]
    |
    +--> Contract --> [Contract Review Pipeline]
    |
    +--> Receipt --> [Expense Processing Pipeline]
    |
    +--> Unknown --> [Manual Classification Queue]
```

### 4.3 Classification with LLMs

```
Classify this document into one of the following categories:
- invoice: Bills requesting payment for goods or services
- contract: Legal agreements between parties
- receipt: Proof of purchase or payment
- correspondence: Letters, emails, or general communication
- form: Structured forms requiring data entry

Document text (first 500 words):
{document_text}

Return JSON: {"category": "...", "confidence": 0.0-1.0, "reasoning": "..."}
```

---

## 5. End-to-End Document Processing Pipeline

### 5.1 Complete Pipeline

```
Document Input (email, scan, upload, API)
    |
    v
[Ingestion] - Normalize format, extract text (OCR if needed)
    |
    v
[Classification] - Determine document type
    |
    v
[Extraction] - Extract structured data based on document type
    |
    v
[Validation] - Verify extracted data quality
    |
    +--> High Confidence: [Automated Processing]
    |                          |
    |                          v
    |                     [Business System Entry]
    |                          |
    |                          v
    |                     [Archive Document]
    |
    +--> Low Confidence: [Human Review Queue]
                              |
                              v
                         [Human Corrects/Approves]
                              |
                              v
                         [Business System Entry]
                              |
                              v
                         [Archive + Training Data]
```

### 5.2 Human-in-the-Loop

Design the review interface for efficiency:
- Show the original document alongside extracted data
- Highlight extracted fields on the document image
- Pre-fill fields with extracted values for quick verification
- One-click approval for high-confidence extractions
- Inline editing for corrections
- Track correction patterns to improve extraction models

---

## 6. Document Storage and Retrieval

### 6.1 Storage Architecture

- Store original documents in object storage (S3, GCS, Azure Blob)
- Store extracted metadata in a searchable database
- Index document text for full-text search
- Maintain document lineage (source, processing steps, modifications)
- Apply retention policies based on document type and regulation

### 6.2 Search and Retrieval

- Full-text search across document content
- Metadata-based filtering (date range, type, status, vendor)
- Semantic search using document embeddings (for finding similar documents)

---

## 7. Compliance and Audit

### 7.1 Audit Trail

For each processed document, maintain:
- Original document (immutable)
- Processing timestamp and pipeline version
- Classification result and confidence
- Extracted data (original and any corrections)
- Who approved (for human-reviewed documents)
- Business system entry confirmation

### 7.2 Retention Policies

| Document Type | Retention | Regulation |
|--------------|-----------|-----------|
| Invoices | 7 years | Tax law |
| Contracts | Life of contract + 6 years | Statute of limitations |
| Employee records | Duration of employment + 7 years | Labor law |
| Medical records | 10+ years | HIPAA |

---

## 8. Key References

- AWS Textract Documentation -- Intelligent document processing
- Google Document AI -- Document understanding platform
- Azure Form Recognizer -- Document field extraction
- Tesseract OCR -- Open-source OCR engine

---

*This module covers document automation. See `process_automation.md` for BPA strategy and `rpa.md` for UI-based automation.*
